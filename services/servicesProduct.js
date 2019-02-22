const services = require('./services');
const products = require('../data/products');
const cards = require('./servicesCard');

const getProductObject = function (productNameKey) {
  return products.filter(
    function(item){
      return services.replaceAll(item.keyName, " ", "").toLowerCase() == services.replaceAll(productNameKey, " ", "").toLowerCase();
    })[0];
}

const purchaseProduct = function(cardId, keyName) {
  const card    = cards.returnCard(cardId);
  const product = getProductObject(keyName);
  if(card.valueDay >= product.price && product.productAmount > 0){
    const purchase = {
        keyName: product.keyName,
        name: product.name,
        price: product.price,
        image: product.image,
        purchaseDate: services.formatDate(new Date())
    };
    card.purchases.push(purchase);
    cards.debtCard(card.card, product.price);
    debtProduct(keyName);
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

const listProducts = function(){
  return products;
}

const debtProduct = function(keyName){
  const product = getProductObject(keyName);
  return product.productAmount -= 1;
}

module.exports = {
  purchaseProduct,
  getProductObject,
  listProducts,
  debtProduct
}
