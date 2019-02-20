const express = require('express');
const bodyParser = require('body-parser');
const serviceCard = require('./services/servicesCard');
const serviceProduct = require('./services/servicesProduct');

const app = express();
const port = 3000;

const valueDaily = 20;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//CARTÃO
app.get('/valueCard/:cardId', function(request, response) {
    const cardId  = request.params.cardId;
    const card    = serviceCard.returnCard(cardId) ;
    if (card) {
      response.status(200).send({card});
    }else{
      response.status(404).send({ error: "Dados não localizados." });
    }
});


// PRODUTOS
app.get('/product', function(request, response){
  const products = serviceProduct.listProduct();
  if (products) {
    response.status(200).send({products});
  }else{
    response.status(404).send({ error: "Produtos não localizados." });
  }
});

app.get('/product/:productId', function(request, response){
  const productId = request.params.productId;
  const product     = serviceProduct.getProductObject(productId);
  if (product) {
    response.status(200).send(product);
  }else{
    response.status(404).send({ error: "Produto não localizado." });
  }
});

app.get('/productName/:productName', function(request, response){
  const productName = request.params.productName;
  const product     = serviceProduct.getProductObjectName(productName);
  if (product) {
    response.status(200).send(product);
  }else{
    response.status(404).send({ error: "Produto não localizado." });
  }
});


// VENDA
app.get('/purchase/productId:productId&cardId:cardId', function(request, response) {
    const productId   = request.params.productId;
    const cardId      = request.params.cardId;
    const product     = serviceProduct.getProductObject(productId);
    const card        = serviceCard.returnCard(cardId);
    serviceCard.rechargeCardOnFirstUse(cardId, valueDaily);
    if (!product) {
      response.status(404).send({ error: "Produto não localizado." });
    }
    if (!card) {
      response.status(404).send({ error: "Cartão não localizado." });
    }
    if (card.valueDay >= product.price) {
      if (product.productAmount > 0) {
        const productCard = serviceProduct.purchaseProduct(card.card, product._id);
        response.status(200).send(productCard);
      }else{
        response.status(404).send({ error: "Produto sem estoque." });
      }
    }else{
      response.status(401).send({ error: "Saldo insuficiente." });
    }
});



//const listener = app.listen(process.env.PORT, function() {
app.listen(port, function() {
  console.log('A API está rodando na porta: ' + this.address().port);
});
