var criaJogo = function(sprite) {

    var palavraSecreta = [];
    var etapa = 1;
    var palavraSecretaString = '';
    contaErradas = 0;
    contaCertas = 0;

    var ganhou = function(){
        palavraSecretaString = palavraSecreta.join('');
        if(this.palavra === palavraSecretaString) {
            return true;
        } else {
            return false;
        }
    };

    var perdeu = function(){
        if(contaErradas >= 8) {
            return true;
        } else {
            return false;
        }
    };

    var ganhouOuPerdeu = function(){
        if(this.palavra === palavraSecretaString || contaErradas >= 8) {
            return true;
        } else {
            return false;
        }
    };
    var reinicia = function(){
        sprite.reset();
        contaCertas = 0;
        contaErradas = 0;
        etapa = 1;
        palavraSecretaString = '';
        palavraSecreta = [];
        this.palavra = undefined;
        this.arrPalavra = '';
    };

    var processaChute = function(chute) {
        this.arrPalavra = this.palavra.split("");
        contador = 0;
        for(var i = 0; i < this.arrPalavra.length; i++) {
            if(chute === this.arrPalavra[i]) {
                palavraSecreta[i] += chute;
                contador++;
                contaCertas++;
            }
        }

        if(contador == 0){
            contaErradas++;
            sprite.nextFrame();
        }
    };

    var getEtapa = function(){
        if(this.palavra === undefined) {
            return etapa;
        } else {
            etapa++;
            return etapa;
        }
    };

    var getLacunas = function(){
        return palavraSecreta;
    };

    var setPalavraSecreta = function(palavra){
        this.palavra = palavra;
        for(var i = 0; i < palavra.length; i++) {
            palavraSecreta.push('');
        }
    };

    return {
        getEtapa: getEtapa,
        getLacunas: getLacunas,
        setPalavraSecreta: setPalavraSecreta,
        processaChute: processaChute,
        ganhou: ganhou,
        perdeu: perdeu,
        ganhouOuPerdeu: ganhouOuPerdeu,
        reinicia: reinicia
    };
};


// var jogo = criaJogo(createSprite('.sprite'));
// jogo.setPalavraSecreta("calopsita");
// jogo.processaChute('c');
// jogo.processaChute('a');
// jogo.processaChute('l');
// jogo.processaChute('o');
// jogo.processaChute('p');
// jogo.processaChute('s');
// jogo.processaChute('i');
// jogo.processaChute('e');
// jogo.processaChute('f');
// jogo.processaChute('g');
// jogo.processaChute('h');
// jogo.processaChute('j');
// jogo.processaChute('k');
// jogo.processaChute('m');
// jogo.getLacunas();