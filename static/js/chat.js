document.addEventListener("DOMContentLoaded", function () {
  const botButton = document.querySelector('.bot-button');
  const logo = document.querySelector('.logo');
  const menu = document.querySelector('.container');
  const botao = document.querySelector('.bot-button');
  const formulario = document.querySelector('.form-bot');
  const botMessageContainer = document.querySelector('.mensagem-bot'); // Agora este será o container principal
  const textarea = document.querySelector('.mensagem-user textarea');

  // Verifica se os elementos existem antes de associar eventos
  if (logo && botButton) {
    // Quando passar o mouse na logo, o botão aparece
    logo.addEventListener('mouseenter', () => {
      botButton.classList.add('hovered');
    });

    // Quando o mouse sair da logo, o botão desaparece (se não estiver na div bot-button)
    logo.addEventListener('mouseleave', () => {
      if (!botButton.matches(':hover')) {
        botButton.classList.remove('hovered');
      }
    });

    // Manter o botão visível enquanto o mouse estiver sobre a área da div
    botButton.addEventListener('mouseenter', () => {
      botButton.classList.add('hovered');
    });

    // Quando o mouse sair da div bot-button, o botão desaparece
    botButton.addEventListener('mouseleave', () => {
      botButton.classList.remove('hovered');
    });
  }

  // Variável para controlar o estado do menu (aberto ou fechado)
  let menuAberto = false;

  // Quando o botão for clicado, alterna o estado do menu
  if (botao && menu) {
    botao.addEventListener('click', () => {
      if (!menuAberto) {
        menu.classList.add('hovered'); // Adiciona a classe que faz o menu aparecer
        menuAberto = true; // Marca o menu como aberto
      } else {
        menu.classList.remove('hovered'); // Remove a classe que faz o menu desaparecer
        menuAberto = false; // Marca o menu como fechado
      }
    });
  }

  // Faz o Enter enviar e Ctrl+Enter quebrar linha
  if (textarea && formulario) {
    textarea.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        if (event.ctrlKey) {
          const cursorPos = textarea.selectionStart;
          const value = textarea.value;
          textarea.value = value.substring(0, cursorPos) + "\n" + value.substring(cursorPos);
          textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
          event.preventDefault(); // Evita a quebra de linha padrão com Ctrl+Enter
        } else {
          event.preventDefault(); // Evita a quebra de linha padrão com Enter sozinho
          formulario.requestSubmit();
          console.log('RequestSubmit() foi chamado!');
        }
      }
    });
  }

  formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Formulário ENVIADO!');

    const formData = new FormData(formulario);

    // Limpa o container de mensagens do bot ANTES de exibir a nova resposta
    botMessageContainer.innerHTML = '';

    // Cria o container da resposta (com loader primeiro)
    const botContainer = document.createElement('div');
    botContainer.classList.add('bot-response');

    const loader = document.createElement('div');
    loader.classList.add('loader');
    botContainer.appendChild(loader);

    botMessageContainer.appendChild(botContainer); // Adiciona ao container principal
    botMessageContainer.scrollTop = botMessageContainer.scrollHeight;

    try {
      const response = await fetch('/perguntar', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      // Remove loader e adiciona resposta
      botContainer.removeChild(loader);
      const respostaTexto = document.createElement('div');
      respostaTexto.classList.add('message-chat');
      respostaTexto.innerText = data.resposta;
      botContainer.appendChild(respostaTexto);

      botMessageContainer.scrollTop = botMessageContainer.scrollHeight; // Scroll no container principal
      formulario.reset();

    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      botMessageContainer.textContent = "Erro ao obter resposta."; // Feedback de erro
    }
  });

  // Faz o textarea crescer dinamicamente enquanto digita
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }


  // Função para a animação de digitação
  function typeMessage(message, element) {
    let index = 0;
    element.style.visibility = 'visible';
    let interval = setInterval(() => {
      if (index < message.length) {
        element.textContent += message[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);
  }

  // Função para mostrar a resposta do bot com animação
  function showBotResponse(response) {
    const botElement = botMessageContainer; // Agora usa o container principal
    if (botElement) {
      const respostaTexto = document.createElement('div');
      respostaTexto.classList.add('message-chat');
      respostaTexto.style.visibility = 'hidden'; // Inicialmente invisível para a animação
      botElement.appendChild(respostaTexto);
      typeMessage(response, respostaTexto);
      botElement.scrollTop = botElement.scrollHeight;
    }
  }

  // Espera até que o conteúdo da página seja carregado
  window.onload = function () {
    // Se houver uma mensagem inicial renderizada no .mensagem-bot,
    // você pode optar por animá-la aqui também, se desejar.
    // Exemplo (se a mensagem inicial estiver diretamente dentro da div):
    const primeiraMensagem = botMessageContainer.textContent.trim();
    botMessageContainer.textContent = ''; // Limpa o conteúdo inicial
    if (primeiraMensagem) {
      const primeiraRespostaElement = document.createElement('div');
      primeiraRespostaElement.classList.add('message-chat');
      primeiraRespostaElement.style.visibility = 'hidden';
      botMessageContainer.appendChild(primeiraRespostaElement);
      typeMessage(primeiraMensagem, primeiraRespostaElement);
    }
  };
});