var frase = $('.frase').text();

var numeroPalavras = frase.split(' ').length;

var tamanhoFrase = $('#tamanho-frase');
tamanhoFrase.text(numeroPalavras);

var campoDigitacao = $('.campo-digitacao');
campoDigitacao.on('input', function() {
    var conteudo = campoDigitacao.val();

    var quantidadePalavras = conteudo.split(/\S+/).length - 1;
    $('#contador-palavras').text(quantidadePalavras);

    var quantidadeCaracteres = conteudo.length;
    $('#contador-caracteres').text(quantidadeCaracteres);
});

var tempoRestante = $('#tempo').text();
campoDigitacao.one('focus', function() {
    var cronometroID = setInterval(function() {
        tempoRestante--;
        $('#tempo').text(tempoRestante);
        if(tempoRestante < 1) {
            campoDigitacao.attr('disabled', true);
            clearInterval(cronometroID);
        }
    }, 1000);
})