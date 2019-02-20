const services = require('./services');
const products = require('./products');
const cards = require('./servicesCard');

const getProductObject = function (productName) {
  return products.filter(
    function(item){
      return item.name == productName
    })[0];
  // buscamos a posição 0 desse array filtrado. Posteriormente, quando isso for buscar do banco, removemos essa parte
}

const purchaseProduct = function(cardId, productName) {

  const card = cards.returnCard(cardId);
  const product = getProductObject(productName);
  if(card.valueDay >= product.price){
    const purchase = product;
    purchase.purchaseDate = services.formatDate(new Date());
    card.purchases.push(purchase);
    card.valueDay = card.valueDay - product.price;
    console.log("Compra realizada.");
  }else{
    console.log("Não possui saldo suficiente!");
  }
  //retornar posteriormente (true | false)
  return card;
}

module.exports = {
  purchaseProduct,
  getProductObject
}
