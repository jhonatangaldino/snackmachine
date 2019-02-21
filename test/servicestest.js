const assert = require('chai').assert;
const services = require('../services/services');

describe('Serviços comuns', function() {
    it('Formatar data em YYYY-MM-DD', function() {
        var dateFormatted = '2019-02-21';
        var formatDate = services.formatDate(new Date());

        assert.equal(formatDate, dateFormatted);
    });

    it('Substituir todas as ocorrências de um item em uma string', function() {
        var original = "a b c d e f";
        var replaced = "a-b-c-d-e-f"
        var replaceAll = services.replaceAll(original, ' ', '-');
    });
});
