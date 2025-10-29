// Removida a dependência 'readline-sync'


const perguntas = [
  { pergunta: "Qual seleção venceu a última Libertadores?", resposta: "Botafogo" },
  { pergunta: "Quem é o maior campeão da Copa do Brasil", resposta: "Cruzeiro" },
  { pergunta: "Quem é reconhecido como Vozão?", resposta: "Ceará" },
  { pergunta: "Qual o estado do Brasil tem os times, quando se  trata de coletivo, tem mais títulos de modo geral?", resposta: "São Paulo" },
  { pergunta: "Quem é maior? Cristiano Ronaldo ou Messi?", resposta: "Messi" },
  { pergunta: "Quantas vezes o Real Madrid venceu a Champions League até 2025?", resposta: "14" },
  { pergunta: "Em que ano Neymar deixou o futebol europeu para voltar ao Brasil (ou trocou de clube europeu para outro)?", resposta: "2023" },
  { pergunta: "Quantas Libertadores o Flamengo tem até 2025?", resposta: "3" },
  { pergunta: "Qual foi o maior números de gols que CR7 já marcou em só uma edição de Champions?", resposta: "17" },
  { pergunta: "Qual país vai sediar a final da Libertadores 2025?", resposta: "Peru" }
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
