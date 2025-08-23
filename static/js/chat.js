document.addEventListener("DOMContentLoaded", function () {

    const botButton = document.querySelector('.bot-button');
    const logo = document.querySelector('.logo');
    const menu = document.querySelector('.container');
    const botao = document.querySelector('.button');
    const formulario = document.querySelector('.form-bot');
    const botMessageContainer = document.querySelector('.mensagem-bot');
    const textarea = document.querySelector('.mensagem-user textarea');
        
    if (logo && botButton) {
        logo.addEventListener('mouseenter', () => {
        botButton.classList.add('hovered');
    });
    
    logo.addEventListener('mouseleave', () => {
        if (!botButton.matches(':hover')) {botButton.classList.remove('hovered');}
    });
    botButton.addEventListener('mouseenter', () => {botButton.classList.add('hovered');
    });
    botButton.addEventListener('mouseleave', () => {botButton.classList.remove('hovered');
    });
    }   
    
    let menuAberto = false;
    if (botao && menu) {
        botao.addEventListener('click', () => {
        if (!menuAberto) {
            menu.classList.add('hovered');
            menuAberto = true;
        } else {
            menu.classList.remove('hovered');
            menuAberto = false;
        }
        });
    }
    if (textarea && formulario) {
        textarea.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            if (event.ctrlKey) {
                const cursorPos = textarea.selectionStart;
                const value = textarea.value;
                textarea.value = value.substring(0, cursorPos) + "\n" + value.substring(cursorPos);
                textarea.selectionStart = textarea.selectionEnd = cursorPos + 1;
                event.preventDefault();
            } else {
                event.preventDefault();
                formulario.requestSubmit();
                console.log('RequestSubmit() foi chamado!');
            }
        }
        });
    }

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
            }, 30); // Ajuste a velocidade da digitação aqui (em milissegundos)
    }

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Formulário ENVIADO!');
        
        const formData = new FormData(formulario);
        botMessageContainer.innerHTML = '';
        const botContainer = document.createElement('div');
        botContainer.classList.add('bot-response');
        const loader = document.createElement('div');
        loader.classList.add('loader');
        botContainer.appendChild(loader);
        botMessageContainer.appendChild(botContainer);
        botMessageContainer.scrollTop = botMessageContainer.scrollHeight;
        try {
            const response = await fetch('/perguntar', {
            method: 'POST',
            body: formData
            });
            const data = await response.json();
            botContainer.removeChild(loader);
            const respostaTexto = document.createElement('div');
            respostaTexto.classList.add('message-chat');
            respostaTexto.style.visibility = 'hidden';
            botContainer.appendChild(respostaTexto);
            typeMessage(data.resposta, respostaTexto);
            botMessageContainer.scrollTop = botMessageContainer.scrollHeight;
            formulario.reset();
        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            botMessageContainer.textContent = "Erro ao obter resposta.";
        }
    });
    
    if (textarea) {
        textarea.addEventListener('input', () => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    });
    }   
});