document.addEventListener("DOMContentLoaded", function () {

  const botButton = document.querySelector('.bot-button');
  const logo = document.querySelector('.logo');
  const menu = document.querySelector('.container');
  const botao = document.querySelector('.bot-button');
  const formulario = document.querySelector('.form-bot'); // Seleciona o formulário com a classe 'form-bot'
  const botMessage = document.getElementById('bot-message'); // Seleciona o local da resposta do bot
  const textarea = document.querySelector('.mensagem-user textarea');
  const form = document.querySelector('.mensagem-user form');

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

  // Previne o comportamento padrão de recarregar a página ao enviar o formulário
  if (formulario) {
    formulario.addEventListener('submit', async (event) => {
      event.preventDefault(); // Impede o reload da página

      const formData = new FormData(formulario);

      try {
        const response = await fetch('/perguntar', {
          method: 'POST',
          body: formData
        });

        const data = await response.json();

        // Atualiza a mensagem do bot sem recarregar
        if (botMessage) {
          botMessage.innerText = data.resposta;
        }

        // Limpa o campo do textarea
        formulario.reset();
      } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
      }
    });
  }

  // Faz o textarea crescer dinamicamente enquanto digita
  if (textarea) {
    textarea.addEventListener('input', () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    });
  }

  // Faz o Enter enviar e Ctrl+Enter quebrar linha
  if (textarea && form) {
    textarea.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        if (event.ctrlKey) {
          // Se Ctrl+Enter, insere quebra de linha
          const cursorPos = textarea.selectionStart;
          const value = textarea.value;
          textarea.value = value.substring(0, cursorPos) + "\n" + value.substring(cursorPos);
          textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
          event.preventDefault(); // impede o comportamento padrão
        } else {
          // Só Enter → envia o formulário
          event.preventDefault();
          form.submit();
        }
      }
    });
  }

  // Função para a animação de digitação
  function typeMessage(message, element) {
    let index = 0;
    element.style.visibility = 'visible';  // Torna o elemento visível apenas quando a animação começar
    let interval = setInterval(() => {
      if (index < message.length) {
        element.textContent += message[index];
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);  // A velocidade de digitação (100ms entre cada caractere)
  }

  // Função para mostrar a resposta do bot com animação
  function showBotResponse(response) {
    const botElement = document.getElementById('bot-message');
    if (botElement) {
      botElement.textContent = '';  // Limpar qualquer mensagem anterior
      botElement.style.visibility = 'hidden';  // Inicialmente, o texto não é visível
      typeMessage(response, botElement);  // Iniciar a animação de digitação
    }
  }

  // Espera até que o conteúdo da página seja carregado
  window.onload = function () {
    const botMessageElement = document.getElementById('bot-message');

    // Se houver uma resposta do bot no HTML, aplica a animação
    if (botMessageElement) {
      const botMessage = botMessageElement.textContent;
      botMessageElement.textContent = '';  // Limpa a mensagem antes de iniciar a animação
      botMessageElement.style.visibility = 'hidden';  // Garante que a mensagem não aparece ainda
      typeMessage(botMessage, botMessageElement);
    }
  };

});