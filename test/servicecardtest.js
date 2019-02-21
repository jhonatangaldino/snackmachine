const assert = require('chai').assert;
const cards = require('../services/cards');
const servicesCard = require('../services/servicesCard');
const services = require('../services/services');

describe('Serviços do cartão', function () {
    it('Primeiro uso do dia, recarregar cartao', function() {
         // preparação dos dados de comparação
        cards.length = 0;
        cards.push({
            "name": "Jhonatan Galdino",
            "card":99999,
            "valueDay":0,
            "purchases":[]
          });

          //chamada da sua função
        var abc = servicesCard.rechargeCardOnFirstUse(99999,20);

        // comparação dos valores
        assert.equal(abc.valueDay, 20);
    });

});
