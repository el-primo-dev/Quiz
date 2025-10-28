// Removida a dependência 'readline-sync'

const perguntas = [
    { pergunta: "Em que ano aconteceu a primeira Copa do Mundo de futebol?", resposta: "1930" },
    { pergunta: "Quantas Copas do Mundo a selecao brasileira ja venceu?", resposta: "5" },
    { pergunta: "Em que ano Pele ganhou sua primeira Copa do Mundo?", resposta: "1958" },
    { pergunta: "Quantos gols Miroslav Klose marcou em Copas do Mundo?", resposta: "16" },
    { pergunta: "Em que ano o Brasil conquistou o pentacampeonato mundial?", resposta: "2002" },
    { pergunta: "Quantas vezes o Real Madrid venceu a Champions League ate 2023?", resposta: "14" },
    { pergunta: "Em que ano Neymar se transferiu do Santos para o Barcelona?", resposta: "2013" },
    { pergunta: "Quantos titulos de Libertadores o Flamengo tinha ate 2023?", resposta: "3" },
    { pergunta: "Quantos gols Cristiano Ronaldo marcou em Copas do Mundo ate 2022?", resposta: "8" },
    { pergunta: "Em que ano o futebol passou a ser modalidade olimpica?", resposta: "1900" }
];

document.addEventListener('DOMContentLoaded', () => {
    const nomeInput = document.getElementById('nomeInput');
    const iniciarQuizButton = document.getElementById('iniciarQuiz');
    const quizContainer = document.getElementById('quizContainer');
    const resultadoDiv = document.getElementById('resultado');

    function exibirPerguntas() {
        // Exibe o nome do jogador
        const nome = nomeInput.value.trim() || "Jogador(a)";
        console.log(`Então vamos começar o quiz sobre futebol, boa sorte ${nome}!`);
        
        quizContainer.innerHTML = ''; // Limpa o container
        quizContainer.style.display = 'block';

        perguntas.forEach((q, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            
            card.innerHTML = `
                <p><strong>${index + 1}. ${q.pergunta}</strong></p>
                <input type="text" id="resposta-${index}" placeholder="Digite a resposta" data-index="${index}">
            `;
            quizContainer.appendChild(card);
        });

        // Adiciona o botão de finalizar
        const finalizarButton = document.createElement('button');
        finalizarButton.textContent = 'Finalizar Quiz';
        finalizarButton.onclick = calcularPontuacao;
        quizContainer.appendChild(finalizarButton);
    }

    function calcularPontuacao() {
        let pontuacao = 0;
        
        perguntas.forEach((q, index) => {
            const input = document.getElementById(`resposta-${index}`);
            // Tratamento: garante que a resposta do usuário seja tratada como string 
            // para comparação com o array (agora string também).
            const respostaUsuario = input.value.trim();
            
            // Aqui, usamos o operador de igualdade estrita (===)
            // e convertemos as respostas para string no array (veja acima).
            if (respostaUsuario === q.resposta) {
                pontuacao++;
                input.style.backgroundColor = '#d4edda'; // Verde claro para acerto
            } else {
                input.style.backgroundColor = '#f8d7da'; // Vermelho claro para erro
            }
        });

        exibirResultado(pontuacao);
    }

    function exibirResultado(pontuacao) {
        let mensagem = '';
        if (pontuacao <= 3) {
            mensagem = `QUE PENA, VOCÊ ACERTOU ${pontuacao}/${perguntas.length}, MAS NÃO DESANIME, DOS ERROS OCORREM OS ACERTOS`;
        } else if (pontuacao > 3 && pontuacao <= 7) {
            mensagem = `MUITO BEM, VOCÊ ACERTOU ${pontuacao}/${perguntas.length}, ÓTIMO RESULTADO`;
        } else if (pontuacao >= 8) {
            mensagem = `PERFEITO, VOCÊ ACERTOU ${pontuacao}/${perguntas.length}, UM MAESTRO`;
        }
        
        resultadoDiv.innerHTML = `<p>${mensagem}</p>`;
        // Oculta o botão de finalizar
        quizContainer.querySelector('button').style.display = 'none';
    }

    // Ouve o clique do botão "Iniciar Quiz"
    iniciarQuizButton.onclick = () => {
        if (nomeInput.value.trim() !== '') {
            exibirPerguntas();
            iniciarQuizButton.style.display = 'none'; // Esconde o botão Iniciar
            nomeInput.disabled = true; // Bloqueia o campo nome
        } else {
            alert('Por favor, digite seu nome para começar!');
        }
    };
});
