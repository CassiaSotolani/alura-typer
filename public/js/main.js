var frase = $('.frase').text();
var numeroPalavras = frase.split(' ').length;

console.log(frase);
console.log(numeroPalavras);

var tamanhoFrase = $('#tamanho-frase');
tamanhoFrase.text(numeroPalavras);