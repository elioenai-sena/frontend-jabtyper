//Calcula o tamanho da frase e imprime no console
var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
console.log(numPalavras);

var tempoJogo = $("#tempo");
var tempoInicial = tempoJogo.text();

//pega o tamanho da frase e apresenta na tela
var frase = $(".frase").text();
var tamanhoFrase = $("#tamanho-frase");
tamanhoFrase.text(numPalavras)

var campo = $("#campo-digitacao");
campo.on("input", function () {
    // Pega o conteudo do campo de texto
    var frase = campo.val();
    //Conta quantos caracteres existem na frase digitada.
    var nCaracteresDigitados = frase.length;
    //Exibe a quantidade na tela.
    $("#caracteres-digitados").text(nCaracteresDigitados);

    //Quebra a frase em palavras e conta as palavras
    var nPalavrasDigitadas = frase.split(" ").length;
    //Exibe a quantidade na tela.
    $("#palavras-digitadas").text(nPalavrasDigitadas);
});


campo.on("focus", function () {
    var tempoRestante = tempoJogo.text();

    var cronometro = setInterval(function () {
        if (tempoRestante <= 0) {
            campo.attr("disabled", true);
            console.log(tempoRestante);
            clearInterval(cronometro);

            nome = $("#nome").val();
            palavrasDigitadas = $("#palavras-digitadas").text();
            pontuacao = palavrasDigitadas / tempoInicial * 60
            $("#tabela-resultado").append('<tr><td>' + nome + '</td><td>' + pontuacao + '</td></tr>');
        } else {
            tempoRestante--;
            tempoJogo.text(tempoRestante);
        }
    }, 1000);

//Barra de Progresso
    var progressBar = $(".progress-bar");
    var progressNumber = 100;
    var barra = setInterval(function () {
        if (progressNumber <= 0) {
            clearInterval(barra);
        } else {
            progressNumber = progressNumber - (100 / tempoInicial)
            console.log(progressNumber);

            progressBar.css('width', progressNumber + "%");
            progressBar.attr('aria-valuenow', progressNumber);
            $(".progress-bar").text(tempoRestante);
        }
    }, 1000)
});


$("#botao-reiniciar").on("click", function () {
    campo.attr("disabled", false);
    campo.val("");
    $("#caracteres-digitados").text("0");
    $("#palavras-digitadas").text("0");
    $("#tempo").text(tempoInicial);
    $(".progress-bar").css('width', 100 + '%');
    $(".progress-bar").text(tempoInicial);
});