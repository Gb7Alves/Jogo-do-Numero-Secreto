let listaDeNumerosSorteados = [];  // Cria um array vazio para armazenar os números sorteados
let numeroLimite = 10;  // Definindo o limite máximo de números (1 até 10)
let numeroSecreto = gerarNumeroAleatorio();  // Gera um número aleatório entre 1 e 10
let tentativas = 1;  // Inicia o contador de tentativas

// Função para exibir o texto na tela em um elemento especificado pela tag
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);  // Seleciona o elemento HTML pela tag
    campo.innerHTML = texto;  // Altera o conteúdo do elemento para o texto fornecido
    
    // Chama a função responsiveVoice.speak para falar o texto (necessário a inclusão da biblioteca)
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", 
        {rate: 1.2  // Ajusta a velocidade da fala (valor entre 0.1 e 2)
    });
}

// Função para exibir a mensagem inicial do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");  // Exibe título
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10");  // Exibe instrução inicial
}

exibirMensagemInicial();  // Exibe a mensagem inicial quando o jogo começa

// Função para verificar o chute do jogador
function verificarChute() {
    let chute = document.querySelector("input").value;  // Obtém o valor digitado no campo de input
    
    // Verifica se o chute está correto
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");  // Exibe mensagem de acerto
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";  // Verifica plural ou singular
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;  // Monta a mensagem de tentativas
        exibirTextoNaTela("p", mensagemTentativas);  // Exibe a mensagem de tentativas
        
        // Habilita o botão de reiniciar após acertar
        document.getElementById("reiniciar").removeAttribute("disabled");  
    } else {
        // Verifica se o chute foi maior ou menor que o número secreto
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O número secreto é menor");  // Dica: número secreto é menor
        } else {
            exibirTextoNaTela("p", "O número secreto é maior");  // Dica: número secreto é maior
        }
        tentativas++;  // Incrementa o número de tentativas
        limparCampo();  // Limpa o campo de input para o próximo chute
    }
}

// Função para gerar um número aleatório entre 1 e 10
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);  // Gera um número aleatório entre 1 e 10
    
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;  // Quantidade de números já sorteados

    // Se todos os números possíveis já foram sorteados, reinicia a lista
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];  // Reinicia a lista de números sorteados
    }

    // Verifica se o número já foi sorteado antes, caso afirmativo gera um novo número
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();  // Se o número já foi sorteado, gera um novo número
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);  // Adiciona o número sorteado na lista
        console.log(listaDeNumerosSorteados);  // Exibe a lista de números sorteados no console para debug
        return numeroEscolhido;  // Retorna o número sorteado
    }
}

// Função para limpar o campo de input após o jogador tentar um chute
function limparCampo() {
    chute = document.querySelector("input");  // Seleciona o campo de input
    chute.value = "";  // Limpa o campo de input
}

// Função para reiniciar o jogo
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();  // Gera um novo número secreto
    limparCampo();  // Limpa o campo de input
    tentativas = 1;  // Reseta o contador de tentativas
    exibirMensagemInicial();  // Exibe novamente as mensagens iniciais
    document.getElementById("reiniciar").setAttribute("disabled", true);  // Desabilita o botão de reiniciar enquanto o jogo não for ganho
}
