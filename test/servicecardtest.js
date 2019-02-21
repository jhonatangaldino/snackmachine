const assert = require('chai').assert;
const cards = require('../data/cards');
const servicesCard = require('../services/servicesCard');
const services = require('../services/services');

describe('Serviços do cartão', function () {
    it('Primeiro uso do dia, recarregar cartao', function() {
        cards.length = 0;
        cards.push({
            "name": "Jhonatan Galdino",
            "card":99999,
            "valueDay":0,
            "purchases":[]
          });

        var abc = servicesCard.rechargeCardOnFirstUse(99999,20);
        assert.equal(abc.valueDay, 20);
    });

    it('Cartão Dados', function() {
      cards.length = 0;
      cards.push({
          "name": "Jhonatan Galdino",
          "card":565462,
          "valueDay":0,
          "purchases":[]
        });

        var abc = servicesCard.returnCard(565462);
        assert.equal(abc, cards[0]);
    });

    it('Débito Cartão', function() {
        cards.length = 0;
        cards.push({
            "name": "Jhonatan Galdino",
            "card":75615,
            "valueDay":12.5,
            "purchases":[]
          });

        var abc = servicesCard.debtCard(75615, 10);
        assert.equal(abc, 2.5);
    });

    it('Compras do dia', function() {
        cards.length = 0;
        cards.push({
            "name": "Jhonatan Galdino",
            "card":546542,
            "valueDay":12.5,
            "purchases":[{
                "keyName": "chocolatelaka",
                "name": "Chocolate Laka",
                "price": 3.5,
                "productAmount": 6,
                "purchaseDate": "2019-02-21"
            },{
                "keyName":"doritos",
                "name": "Doritos",
                "price": 4,
                "productAmount":10,
                "purchaseDate": "2019-02-21"
            }]
          });

        var abc = servicesCard.purchasesDay(546542, new Date(2019,1,21));
        assert.equal(abc.purchaseDate, '2019-02-21');
    });

    it('Visualização de saldo', function() {
        cards.length = 0;
        cards.push({
            "name": "Jhonatan Galdino",
            "card":82635,
            "valueDay":12.5,
            "purchases":[]
          });

        var abc = servicesCard.returnCard(82635);
        assert.equal(abc.valueDay, 12.5);
    });
});
