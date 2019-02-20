const express = require('express');
const app = express();

const serviceCard = require('./services/servicesCard');
const serviceProduct = require('./services/sevicesProduct');

app.get('/value/:cardId', function(request, response) {
  const cardId = request.params.cardId;
  const value = serviceCard.showAvailableValue(cardId);
  response.send(value);
});

app.get('/value/:cardId', function(request, response) {
  const cardId = request.params.cardId;
  const productName = request.params.productName
  const value = serviceProduct.purchaseProduct(cardId, productName);
  response.send(value);
});

app.post('/purchase', function(request, response) {

});

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
