var criaController = function(jogo) {

    var $entrada = $(".entrada");
    var $lacunas = $(".lacunas");

    // consulta jogo.getLacunas() e exibe para o usuário cada lacuna 

    var exibeLacunas = function () {
        var lacunas = jogo.getLacunas();
        for(var i = 0; i < lacunas.length; i++) {
            $lacunas.append("<li class='lacuna'></li>");
        }
    };

    // muda o texto do placeHolder do campo de entrada    
    var mudaPlaceHolder = function () {
        $entrada.val('');
        $entrada.attr("placeholder", "chute");
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    var guardaPalavraSecreta = function (palavra) {
        jogo.setPalavraSecreta(palavra);
    };

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    var inicia = function () {

        $entrada.keypress(function (event) {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta($entrada.val());
                        mudaPlaceHolder();
                        exibeLacunas();
                        break;
                    case 2:
                        alert('etapa 2 - falta implementar');
                        break;
                }
            }
        });
    };

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { inicia: inicia };
};

criaController(
    criaJogo(
        createSprite(".sprite")
        )
).inicia();