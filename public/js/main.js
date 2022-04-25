var tempoInicial = $('#tempo').text();
var campoDigitacao = $('.campo-digitacao');

$(document).ready(function() {
    atualizarTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    $('#botao-reiniciar').click(reiniciarJogo);
});

function atualizarTamanhoFrase() {
    var frase = $('.frase').text();
    var numeroPalavras = frase.split(' ').length;
    var tamanhoFrase = $('#tamanho-frase');
    tamanhoFrase.text(numeroPalavras);
}

function inicializarContadores() {
    campoDigitacao.on('input', function() {
        var conteudo = campoDigitacao.val();
    
        var quantidadePalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(quantidadePalavras);
    
        var quantidadeCaracteres = conteudo.length;
        $('#contador-caracteres').text(quantidadeCaracteres);
    });
}

function inicializarCronometro() {
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
}

function reiniciarJogo() {
    campoDigitacao.attr('disabled', false);
    campoDigitacao.val('');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo').text(tempoInicial);
    inicializarCronometro();
}
