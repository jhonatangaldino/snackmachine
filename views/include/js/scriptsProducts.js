  $(document).ready(function() {
    listProducts();

    $('#btnSubmit').click(function(event) {
        var form = $('#frmCard')
        if (form[0].checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
          form.addClass('was-validated');
        }else{
          getDataCart(form);
        }
    });

    $('#btnConfirm').click(function(event) {
        var form = $('#frmCard')
        if (form[0].checkValidity() === false) {
          event.preventDefault()
          event.stopPropagation()
          form.addClass('was-validated');
        }else{
          purchaseConfirm(form);
        }
    });

    $('#productModal').on('hidden.bs.modal', function (e) {
      $('#frmCard').removeClass('was-validated');
      $('#cardNumber').val('');
      $('.showAvailableValue').hide();
      $('#btnConfirm').hide();
      $('#btnSubmit').show();
    })

    $('#productModal').on('shown.bs.modal', function () {
      $('#cardNumber').trigger('focus');
      $('#cardNumber').val('');
      $('.showAvailableValue').hide();
      $('#btnConfirm').hide();
      $('#btnSubmit').show();
    })
  });

  function listProducts(){

      var request  = $.ajax({
        method: 'GET',
        url: '../products',
        dataType: "JSON"
      });

      request.done(function( data ) {
        var products = data.products;
        var htmlProduct = '';
        htmlProduct = htmlProduct + '<div class="row">';
        for (var i = 0; i < products.length; i++) {
          var amount = 28;
          var availability = '';
          var disabled = 'optionProduct';
          var openProduct = 'onclick="openProduct(\'' + products[i].keyName +'\');"';
          if (products[i].productAmount < amount) {
            amount = products[i].productAmount;
          }
          for (var q = 0; q < amount; q++) {
             availability = availability + '&#9733;';
          }
          if (products[i].productAmount <= 0) {
            disabled = 'disabled';
            availability = 'Produto Indisponível';
            openProduct = '';
          }
          htmlProduct = htmlProduct + ' <div class="col-lg-4 col-md-6 mb-4">' +
                                      '   <div class="card h-100 ' + disabled + '" ' + openProduct + '>' +
                                      '     <img class="card-img-top" src="./include/img/' + products[i].image + '">' +
                                      '     <div class="card-body">' +
                                      '       <h4 class="card-title">' +
                                      '         <a href="#" class="' + disabled + '">' + products[i].name + '</a>' +
                                      '       </h4>' +
                                      '       <h5>R$' + formatMoney(products[i].price) + '</h5>' +
                                      '     </div>' +
                                      '     <div class="card-footer">' +
                                      '       <small class="text-muted" title="Quantidade disponível">' + availability + '</small>' +
                                      '     </div>' +
                                      '   </div>' +
                                      ' </div>';
            if (i % 3 == 2 && i > 0 ) {
              htmlProduct = htmlProduct + '</div>';
              htmlProduct = htmlProduct + '<div class="row">';
            }
        }
        htmlProduct = htmlProduct + '</div>';
        $('.loadProducts').html(htmlProduct);
      });

      request.fail(function(error) {
          var error = JSON.parse(error.responseText);
          $('.loadProducts').html('<div class="row">' + error.error + '<div>');
      });

  }

  function openProduct(keyName){
    var requestProduct  = $.ajax({
      method: 'GET',
      url: '../products/' + keyName,
      dataType: "JSON"
    });
    requestProduct.done(function( data ) {
      var products = data;
      var bodyModalHtml = '';
      bodyModalHtml = '<div class="col-lg-12">' +
                      ' <img class="card-img-top" src="./include/img/' + products.image + '">' +
                      ' <h4 style="color:#007bff;">' + products.name + '</h4>'+
                      ' <h5>R$' + formatMoney(products.price) + '</h5>'
                      '</div>';

      $('#keyName').val(products.keyName);
      $('.productBodyModal').html(bodyModalHtml);
    });

    requestProduct.fail(function(error) {
        var error = JSON.parse(error.responseText);
        $('.productBodyModal').html('<div class="col-lg-12">' + error.error + '<div>');
        $('#frmCard').hide();
    });

    $('#productModal').modal('show');
  }

  function getDataCart(form){
    $.ajax({
      method: 'GET',
      url: '../cards/' + $('#cardNumber').val(),
      dataType: "JSON"
    }).done(function(data) {
      form.addClass('was-validated');
      var card = data.card;
      var dataCard = '';
      dataCard =  '<h5><b>Nome:</b> ' + card.name +
                  '<br/><b>Saldo:</b> R$' + formatMoney(card.valueDay) + '<h5>';
      $('.showAvailableValue').html(dataCard);
      $('.showAvailableValue').css('background', '#ddfff3').css('border-color', '#5a9b84').fadeIn();
      $('#btnSubmit').hide('fast');
      $('#btnConfirm').show('fast');
    }).fail(function(error) {
      $('#cardNumber').val('');
      form.addClass('was-validated');
      $('#cardNumber').trigger('focus');
      setTimeout(function(){
        $('#frmCard').removeClass('was-validated');
      }, 2500);
    });
  }

  function purchaseConfirm(form){
    $.ajax({
      method: 'POST',
      url: '/products/purchases',
      dataType: "JSON",
      data:{
        keyname:$('#keyName').val(),
        cardid:$('#cardNumber').val(),
      }
    }).done(function(data) {
      var card = data;
      var dataCard = '';
      if (card.valueDay <= 0) {
        $('#btnConfirm').addClass('disabled').attr('disabled', 'disabled');
      }else{
        $('#btnConfirm').removeClass('disabled').removeAttr('disabled');
      }
      dataCard =  '<h5><b>Nome:</b> ' + card.name +
                  '<br/><b>Saldo:</b> R$' + formatMoney(card.valueDay) + '<h5>';
      $('.showAvailableValue').css('background', '#ddfff3').css('border-color', '#5a9b84').html('<b>Pagamento realizado com sucesso!</b>').fadeIn();
      setTimeout(function(){
        $('.showAvailableValue').html(dataCard);
      }, 2500);
    }).fail(function(error) {
      var error = JSON.parse(error.responseText);
      $('.showAvailableValue').html(error.error);
      $('.showAvailableValue').css('background', '#ffc6c6').css('border-color', '#f44242').fadeIn();
      setTimeout(function(){
        $('.showAvailableValue').fadeOut();
        getDataCart(form);
      }, 2500);
    });
  }

  function formatMoney(n, c, d, t) {
      var c = isNaN(c = Math.abs(c)) ? 2 : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
        j = (j = i.length) > 3 ? j % 3 : 0;

      return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };
