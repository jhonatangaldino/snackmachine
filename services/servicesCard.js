const services = require('./services');
const cards = require('./cards');

const isFirstUse = function(cardId) {
  if(purchasesDay(cardId, new Date()) != undefined){
    console.log("Não é o primeiro uso do dia.");
    return false;
  }else{
    console.log("Primeiro uso do dia.");
    return true;
  }
}

const purchasesDay = function(cardId, date){
   const card = returnCard(cardId);
   return card.purchases.filter(function(item) {
      return services.formatDate(item.purchaseDate) == services.formatDate(date)
    })[0];
}

const rechargeCardOnFirstUse = function(cardId) {
    const card = returnCard(cardId);
    if (isFirstUse(cardId)) {
      card.valueDay = 10;
      console.log("Recarga Efetuada!");
      return card;
    }else{
      console.log("Não efetua recarga!");
    }
};

const showAvailableValue = function(cardId) {
  var amount = 0;
  const card = returnCard(cardId);
  amount = card.valueDay;
  console.log("O valor no cartão é:" , amount);
  return amount;
}

const returnCard = function(cardId) {
  return cards.filter(function(item) { return item.card == cardId })[0];
}

module.exports = {
  showAvailableValue
}
