const services = require('./services');
const cards = require('./cards');

const isFirstUse = function(cardId) {
  if(purchasesDay(cardId, new Date()) != undefined){
    console.log("Não é o primeiro uso do dia [", formatDate(new Date()) ,"] no cartão [", cardId ,"].");
    return false;
  }else{
    console.log("Primeiro uso do dia no cartão [", cardId,"].");
    return true;
  }
}

const purchasesDay = function(cardId, date){
   const card = returnCard(cardId);
   return card.purchases.filter(function(item) {
      return services.formatDate(item.purchaseDate) == services.formatDate(date)
    })[0];
}

const rechargeCardOnFirstUse = function(cardId, value) {
    const card = returnCard(cardId);
    if (isFirstUse(cardId)) {
      card.valueDay = value;
      console.log("Recarga no cartão [", cardId,"] de [", value ,"] foi efetuada!");
      return card;
    }else{
      console.log("Recarga de [", value ,"] no cartão [", cardId,"] não efetuada pois não é primeiro uso.");
    }
};

const showAvailableValue = function(cardId) {
  var amount = 0;
  const card = returnCard(cardId);
  amount = card.valueDay;
  console.log("O valor no [", cardId,"] cartão é:" , amount);
  return amount;
}

const returnCard = function(cardId) {
  return cards.filter(function(item) { return item.card == cardId })[0];
}

module.exports = {
  isFirstUse,
  rechargeCardOnFirstUse,
  showAvailableValue,
  returnCard
}
