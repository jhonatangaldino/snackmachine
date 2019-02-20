const services = require('./services');
const products = require('./products');
const cards = require('./servicesCard');

const getProductObject = function (productId) {
  return products.filter(
    function(item){
      return item._id == productId;
    })[0];
  // buscamos a posição 0 desse array filtrado. Posteriormente, quando isso for buscar do banco, resolver essa parte
}

const getProductObjectName = function (productName) {
  return products.filter(
    function(item){
      return item.name.toUpperCase() == productName.toUpperCase();
    })[0];
}

const purchaseProduct = function(cardId, productId) {
  const card = cards.returnCard(cardId);
  const product = getProductObject(productId);
  if(card.valueDay >= product.price && product.productAmount > 0){
    const purchase = product;
    purchase.purchaseDate = services.formatDate(new Date());
    card.purchases.push(purchase);
    card.valueDay = card.valueDay - product.price;
    cards.debtCard(card.card, product.price);
    debtProduct(productId);
    console.log("Compra no cartão [", card.card ,"] de [", product.price ,"] realizada no dia [", purchase.purchaseDate,"] com sucesso. Saldo Atual:", card.valueDay ,"");
  }else{
    if (product.productAmount <= 0) {
      console.log("Não existe mais o product [(",product._id,")", product.productName ,"]. Quantidade:[",product.productAmount,"]!");
    }else{
      if (card.valueDay < product.price) {
        console.log("O cartão [", card.card ,"] não possui saldo suficiente! Saldo Atual:[",card.valueDay,"]");
      }
    }
  }
  return card;
}

const listProduct = function(){
  return products;
}

const debtProduct = function(productId){
  const product = getProductObject(productId);
  return product.productAmount -= 1;
}

module.exports = {
  purchaseProduct,
  getProductObject,
  getProductObjectName,
  listProduct
}
