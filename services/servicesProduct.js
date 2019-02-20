const services = require('./services');
const products = require('./products');
const cards = require('./servicesCard');

const getProductObject = function (productName) {
  return products.filter(
    function(item){
      return item.name.toUpperCase() == productName.toUpperCase();
    })[0];
  // buscamos a posição 0 desse array filtrado. Posteriormente, quando isso for buscar do banco, resolver essa parte
}

const purchaseProduct = function(cardId, productName) {

  const card = cards.returnCard(cardId);
  const product = getProductObject(productName);
  if(card.valueDay >= product.price){
    const purchase = product;
    purchase.purchaseDate = services.formatDate(new Date());
    card.purchases.push(purchase);
    card.valueDay = card.valueDay - product.price;
    console.log("Compra no cartão [", cardId ,"] de [", product.price ,"] realizada no dia [", purchase.purchaseDate,"] com sucesso.");
  }else{
    console.log("O cartão [", cardId ,"] não possui saldo suficiente! Saldo Atual:[",card.valueDay,"]");
  }
  //retornar posteriormente (true | false)
  return card;
}

//console.log('getProductObject', getProductObject("toddy"));

module.exports = {
  purchaseProduct,
  getProductObject
}
