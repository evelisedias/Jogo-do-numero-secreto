let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;
let primeiraLeitura = true;
boasVindas();

function atualizar() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    primeiraLeitura = true;
    boasVindas();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}

function gerarNumeroAleatorio() {
    let numeEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;

    if (quantidadeElementosLista == 10) {
        listaNumerosSorteados = [];
    }
    if (listaNumerosSorteados.includes(numeEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numeEscolhido);
        console.log(listaNumerosSorteados);
        return numeEscolhido;
    }
}

function ExibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    
    if (primeiraLeitura) {
        if (tag === 'h1') {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
        } else if (tag === 'p') {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
        }
        primeiraLeitura = false;  // Após ler a primeira vez, desativa a leitura do h1
    } else if (tag === 'p') {
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function verificarChute() {
    boasVindas();
    console.log(numeroSecreto);
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;

    if (chute == numeroSecreto) {
        ExibirTextoNaTela('h1', 'Acertou!');
        ExibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (chute > numeroSecreto) {
        ExibirTextoNaTela('p', 'O número secreto é menor');
    } else {
        ExibirTextoNaTela('p', 'O número secreto é maior');
    }
    tentativas++;
    limparCampo();
}

function boasVindas() {
    ExibirTextoNaTela('h1', 'Jogo do número secreto');
    ExibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
