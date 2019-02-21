const services = require('./services');
const cards = require('../data/cards');

const isFirstUse = function(cardId) {
  if(purchasesDay(cardId, new Date())){
    console.log("Não é o primeiro uso do dia [", services.formatDate(new Date()) ,"] no cartão [", cardId ,"].");
    return false;
  }else{
    console.log("Primeiro uso do dia [", services.formatDate(new Date()) ,"] no cartão [", cardId,"].");
    return true;
  }
}

const purchasesDay = function(cardId, date){
   const card = returnCard(cardId);
   return card.purchases.filter(function(item) {
      return item.purchaseDate == services.formatDate(date)
    })[0];
}

const rechargeCardOnFirstUse = function(cardId, value) {
    const card = returnCard(cardId);
    if (isFirstUse(cardId)) {
      card.valueDay = value;
      console.log("Recarga no cartão [", card.card,"] de [", card.valueDay ,"] foi efetuada!");
      return card;
    }else{
      console.log("Recarga de [", card.valueDay ,"] no cartão [", card.card,"] não efetuada pois não é primeiro uso.");
    }
};

const returnCard = function(cardId) {
  return cards.filter(function(item) {
    return item.card == cardId
  })[0];
}

const debtCard = function(cardId, debtValue){
  const card = returnCard(cardId);
  return card.valueDay = card.valueDay - debtValue;
}

module.exports = {
  isFirstUse,
  rechargeCardOnFirstUse,
  returnCard,
  debtCard
}
