SNACK MACHINE
==============

Gerenciamento da [maquina de snack](https://github.com/jhonatangaldino/snackmachine) que são disponibilizadas em grandes empresas.

### Desenvolvimento

- Aplicação em [NodeJs v11.10.0](https://nodejs.org/dist/v11.10.0/node-v11.10.0-x64.msi)
- Controle de versão efetuado com o [GitHub](http://github.com/)
- Criação de Rotas foi utilizado o Express
- Testes unitários utilizando [Mocha](https://mochajs.org/) e [Chai](https://www.chaijs.com/)
- FrontEnd utilizado [Bootstrap 4.3.1](https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js) em conjunto com [jQuery 3.3.1](https://code.jquery.com/jquery-3.3.1.js)

### Instalação

1. Faça o clone deste projeto com `git clone https://github.com/jhonatangaldino/snackmachine.git`
2. Entre na pasta do projeto e instale as dependências com `npm install`
3. Rode a aplicação em algum terminal de comando com o comando `nodemon server.js`
4. Altere, caso necessário, os dados dos cartões em `data/cards.js`
5. Altere, caso necessário, os dados dos produtos em `data/products.js`

### Testando a aplicação

Teste Visual
1. Abra o caminho `http://localhost:3000`
  * Para comprar algum produto exposto, basta selecionar o produto
  * Inserir um número de cartão e buscar pelo mesmo.
    Cartões cadastrados: `12345`, `54321`, `56789`, `98765`, `879511`
  * Caso tenha limite diário disponível clique em `Realizar Pagamento`

Teste Unitário
  * Para efetuar os testes unitários, no terminal executar o comando `mocha` onde será relatado os testes efetuados.

Teste API
1. Abra o Postman ou algum outro API Client de sua preferência.
  * Para retorno dos dados de um cartão, envie uma requisição do tipo *GET* para o endereço `http://localhost:3000/cards/12345` passando um `'card'`
  * Para retorno de uma lista de produtos envie uma requisição do tipo *GET* para o endereço: `http://localhost:3000/products/`
  * Para retorno de um produto especifico, envie uma requisição do tipo *GET* para o endereço `http://localhost:3000/products/gatoradelaranja` passando uma `'keyName'`
  * Para efetuar uma venda, envie uma requisição no body do tipo *POST* para o endereço `http://localhost:3000/products/purchases/` passando os parametros: `productName`:toddy e `cardId`:12345
    * Pode ser alterado o `productName` por um `'keyName'` disponível no *JSON* em `data/products.js`
    * Pode ser alterado o `cardId` por um `'card'` disponível no *JSON* em `data/cards.js`

  ###### O valor diário para recarga do cartão estabelecido como default é de *R$15,00* podendo ser alterada no arquivo: `server.js` na variável `valueDaily`
