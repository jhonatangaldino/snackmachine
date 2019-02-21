const express         = require('express');
const bodyParser      = require('body-parser');
const serviceCard     = require('./services/servicesCard');
const serviceProduct  = require('./services/servicesProduct');
const path            = require('path');

const app = express();
const port = 3000;

const valueDaily = 15;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get('/',function(request, response){
  response.sendFile(path.join(__dirname+'/views/listProducts.html'));
});

app.get('/cards/:cardId', function(request, response) {
    const cardId  = request.params.cardId;
    const card    = serviceCard.returnCard(cardId) ;
    if (card) {
      response.status(200).send({card});
    }else{
      response.status(404).send({ error: "Dados de cartão não localizados." });
    }
});

app.get('/products', function(request, response){
  const products = serviceProduct.listProducts();
  if (products) {
    response.status(200).send({products});
  }else{
    response.status(404).send({ error: "Produtos não localizados." });
  }
});

app.get('/products/:name', function(request, response){
  const name        = request.params.name;
  const product     = serviceProduct.getProductObject(name);
  if (product) {
    response.status(200).send(product);
  }else{
    response.status(404).send({ error: "Produto não localizado." });
  }
});

app.post('/products/purchases', function(request, response) {
    const keyName     = request.body.keyname;
    const cardId      = request.body.cardid;
    const product     = serviceProduct.getProductObject(keyName);
    const card        = serviceCard.returnCard(cardId);
    if (!card) {
      response.status(404).send({ error: "Cartão não localizado." });
    }else{
      serviceCard.rechargeCardOnFirstUse(card.card, valueDaily);
    }
    if (!product) {
      response.status(404).send({ error: "Produto não localizado." });
    }
    if (card.valueDay >= product.price) {
      if (product.productAmount > 0) {
        const productCard = serviceProduct.purchaseProduct(card.card, product.keyName);
        response.status(200).send(productCard);
      }else{
        response.status(404).send({ error: "Produto sem estoque." });
      }
    }else{
      response.status(401).send({ error: "Saldo insuficiente." });
    }
});

app.listen(port, function() {
  console.log('A API está rodando na porta: ' + this.address().port);
});
