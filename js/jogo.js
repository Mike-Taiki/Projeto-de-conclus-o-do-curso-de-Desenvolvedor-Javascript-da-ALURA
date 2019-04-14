var criaJogo = function(sprite) {

    var palavraSecreta = [];
    var etapa = 1;
    var palavraSecretaString = '';
    contaErradas = 0;
    contaCertas = 0;
    contador = 0;

    var ganhou = function(){
        palavraSecretaString = palavraSecreta.join('');
        if(this.palavra === palavraSecretaString) {
            return true;
        } else {
            return false;
        }
    };

    var perdeu = function(){
        return sprite.isFinished();
    };

    var ganhouOuPerdeu = function(){
        return ganhou() || perdeu();
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

        if(!chute.trim()) throw Error("Chute inválido");
        
        this.arrPalavra = this.palavra.split("");

        for(var i = 0; i < this.arrPalavra.length; i++) {

            if(chute == this.arrPalavra[i]) {
                palavraSecreta[i] += chute;
                contaCertas++;
            } else {
                contaErradas++;
            }
            
            if (i == this.arrPalavra.length - 1 && contaCertas > 0) {
                contaErradas = 0;
                contaCertas = 0;
                }
        }



        if (contaErradas != 0) {
            sprite.nextFrame();
            contaErradas = 0;
            contaCertas = 0;
            }
    };

    var getEtapa = function(){
        if(this.palavra === undefined) {
            return etapa;
        } else {
            etapa = 2;
            return etapa;
        }
    };

    var getLacunas = function(){
        return palavraSecreta;
    };

    var setPalavraSecreta = function(palavra){
        if(!palavra.trim()) throw Error("Palavra inválida");
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