const assert = require('chai').assert;
const products = require('../data/products');
const cards = require('../data/cards');
const servicesProduct = require('../services/servicesProduct');
const services = require('../services/services');

describe('Serviços do produtos', function () {

  it('Nova venda', function() {
      cards.length = 0;
      cards.push({
          "name": "Gabriel Maia",
          "card":85462,
          "valueDay":10,
          "purchases":[]
        });

      var purchase = servicesProduct.purchaseProduct(85462, "gatoradelaranja");
      assert.equal(purchase.purchases[0].keyName, "gatoradelaranja");
  });

  it('Busca Produto', function() {
      products.length = 0;
      products.push({
          "keyName":"pacoca",
          "name": "Paçoca",
          "price": 1.5,
          "productAmount":40,
          "purchaseDate": "2019-02-21"
        });

      var product = servicesProduct.getProductObject("pacoca");
      assert.equal(product, products[0]);
  });

});
