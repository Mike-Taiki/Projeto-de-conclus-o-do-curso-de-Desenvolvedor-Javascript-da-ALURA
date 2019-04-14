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
    var mudaPlaceHolder = function (val) {
        $entrada.val('');
        $entrada.attr("placeholder", val);
        $entrada.attr("maxlength", 1);
    };

    // passa para jogo.setPalavraSecreta() o valor digitado pelo jogador e chama o a função `exibeLacunas()` e `mudaPlaceHolder()` definidas no controller. 

    var guardaPalavraSecreta = function (palavra) {
        try {
            jogo.setPalavraSecreta(palavra);
        } catch(err) {
            alert(err.message);
        }
        
    };

    var reinicia = function() {
        jogo.reinicia();
            setTimeout(function() {
                removeLi();
            }, 1);
        mudaPlaceHolder("Plavra secreta");
        inicia();
    }

    var leChute = function() {
        try {

            jogo.processaChute($entrada.val());
            var ul = document.querySelector(".lacunas");
            var li = document.querySelectorAll(".lacuna");

            li.forEach(function(item){
                ul.removeChild(item);
            });

            var getlacunas = jogo.getLacunas();

            setTimeout(function() {
                getlacunas.forEach(function(item) {
                    console.log(item);
                    $lacunas.append(`<li class='lacuna'>${item}</li>`);
                });
            }, 1);

            if(jogo.ganhou() || jogo.perdeu()) {

                setTimeout(function() {
                    if(jogo.ganhou()) {
                        alert("Parabéns, você ganhou!");
                    } else {
                        alert("Você perdeu :-(");
                    }
        
                    reinicia();
                }, 200);
            }

        } catch(err) {
            alert(err.message);
        }
        
    };

    var removeLi = function() {
        var ul = document.querySelector(".lacunas");
            var li = document.querySelectorAll(".lacuna");
                li.forEach(function(item){
                    ul.removeChild(item);
                });
    }

    // faz a associação do evento keypress para capturar a entrada do usuário toda vez que ele teclar ENTER
    var inicia = function () {

        $entrada.keypress(function (event) {
            if(event.which == 13) {
                if(!$entrada.val() && jogo.getEtapa() == 1) {
                    alert("Palavra inválida!");
                } else if(!$entrada.val() && jogo.getEtapa() == 2) {
                    alert('Chute inválido');
                } else {
                    switch (jogo.getEtapa()) {
                        case 1:
                            guardaPalavraSecreta($entrada.val());
                            mudaPlaceHolder("chute");
                            exibeLacunas();
                            break;
                        case 2:
                        console.log(jogo.getEtapa());
                            leChute();
                            break;
                    }
                }
            }
        })
    }

    // retorna um objeto com a propriedade inicia, que deve ser chamada assim que o controller for criado. 
    return { inicia: inicia };
};