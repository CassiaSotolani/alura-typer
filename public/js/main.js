var tempoInicial = $('#tempo').text();
var campoDigitacao = $('.campo-digitacao');

$(document).ready(function() {
    atualizarTamanhoFrase();
    inicializarContadores();
    inicializarCronometro();
    inicializarMarcadores();
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
        $("#botao-reiniciar").attr("disabled",true);
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $('#tempo').text(tempoRestante);
            if(tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizarJogo();
            }
        }, 1000);
    });
}

function finalizarJogo() {
    campoDigitacao.attr('disabled', true);
    campoDigitacao.toggleClass('campo-desativado');
    inserirPlacar();
}

function inicializarMarcadores() {
    var frase = $('.frase').text();
    campoDigitacao.on('input', function() {
        var digitado = campoDigitacao.val();
        var comparavel = frase.substr(0, digitado.length);
        if(digitado == comparavel) {
            campoDigitacao.addClass('borda-verde');
            campoDigitacao.removeClass('borda-vermelha');
        } else {
            campoDigitacao.addClass('borda-vermelha');
            campoDigitacao.removeClass('borda-verde');
        }
    })
}

function inserirPlacar() {
    var corpoTabela = $('.placar').find('tbody');
    var usuario = 'Cassia';
    var numPalavras = $('#contador-palavras').text();
    var botaoRemover = "<a href='#'><i class='small material-icons'>delete</i></a>"

    var linha = '<tr>' +
                    '<td>' + usuario + '</td>' +
                    '<td>' + numPalavras + '</td>' +
                    '<td>' + botaoRemover + '</td>' +
                '</tr>';
    corpoTabela.prepend(linha);
}

$('.botao-remover').on('click', function(event) {
    event.preventDefault();
    $(this).parent().parent().remove();
})

function reiniciarJogo() {
    campoDigitacao.attr('disabled', false);
    campoDigitacao.val('');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo').text(tempoInicial);
    inicializarCronometro();
    campoDigitacao.toggleClass('campo-desativado');
    campoDigitacao.removeClass('borda-vermelha');
    campoDigitacao.removeClass('borda-verde');
}
