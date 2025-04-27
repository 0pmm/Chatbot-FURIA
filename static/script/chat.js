// Seleciona o textarea e o formulário
const textarea = document.querySelector('.mensagem-user textarea');
const form = document.querySelector('.mensagem-user form');

// Faz o textarea crescer dinamicamente enquanto digita
textarea.addEventListener('input', () => {
  textarea.style.height = 'auto'; 
  textarea.style.height = textarea.scrollHeight + 'px';
});

// Faz o Enter enviar e Ctrl+Enter quebrar linha
textarea.addEventListener('keydown', function(event) {
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
  botElement.textContent = '';  // Limpar qualquer mensagem anterior
  botElement.style.visibility = 'hidden';  // Inicialmente, o texto não é visível
  typeMessage(response, botElement);  // Iniciar a animação de digitação
}

// Espera até que o conteúdo da página seja carregado
window.onload = function() {
  const botMessageElement = document.getElementById('bot-message');

  // Se houver uma resposta do bot no HTML, aplica a animação
  if (botMessageElement) {
      const botMessage = botMessageElement.textContent;
      botMessageElement.textContent = '';  // Limpa a mensagem antes de iniciar a animação
      botMessageElement.style.visibility = 'hidden';  // Garante que a mensagem não aparece ainda
      typeMessage(botMessage, botMessageElement);
  }
}
