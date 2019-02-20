const express = require('express');
const bodyParser = require('body-parser');
const serviceCard = require('./services/servicesCard');
const serviceProduct = require('./services/servicesProduct');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CARTÃO
app.get('/valueCard/:cardId', function(request, response) {
  if (response.status(200)) {
    const cardId = request.params.cardId;
    serviceCard.rechargeCardOnFirstUse(cardId, 10);
    const value = serviceCard.showAvailableValue(cardId);
    response.send("O valor é " + value);
  }
});


// PRODUTOS
app.get('/valueProduct/:productName', function(request, response){
  const productName = request.parems.productName;
  const value = serviceProduct.getProductObject(productName);
  response.send("lala" + value);
});

app.post('/purchase', function(request, response) {
  const cardId = request.params.cardId;
  //const value
});



//const listener = app.listen(process.env.PORT, function() {
const listener = app.listen(port, function() {
  console.log('A API está rodando na porta: ' + listener.address().port);
});
