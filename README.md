# 🧠 Chatbot FÚRIA – Guia do Time de CS2

O **Chatbot FÚRIA** é uma aplicação leve e incorporável que simula uma conversa com um bot treinado para responder perguntas sobre o time de CS2 da FURIA, utilizando inteligência artificial via API Gemini.  
O projeto é baseado na comunicação entre o backend em Python e o frontend, sendo o Python responsável por realizar as requisições à API da Gemini, utilizando o modelo **gemini-2.0-flash-lite**. O backend envia um contexto com instruções específicas para que a API atue como um guia de respostas sobre o time de CS2 da FURIA, incluindo as três últimas perguntas feitas pelo usuário para manter a coerência e o contexto das respostas. Além disso, o sistema interpreta dados e estatísticas armazenados em arquivos JSON para enriquecer as respostas.

No frontend, ao clicar no botão com o logotipo da FURIA localizado no canto inferior direito, é exibido o menu de conversação. Quando uma pergunta é enviada — seja ao clicar no botão de envio ou pressionar Enter — ela é transmitida ao backend via método **POST**. Assim que a resposta é recebida, ela é inserida em uma nova `div` criada dinamicamente pelo JavaScript, permitindo que as mensagens sejam atualizadas de forma direta e dinâmica, proporcionando uma experiência fluida ao usuário.

No momento está hospedado em um plano gratuito no Render, portanto após a inatividade ele entra em modo *sleep*, e quando houver um novo acesso, até que ocorra sua ativação, decorre alguns minutos. Todavia, funciona totalmente como esperado!  

**Todas as estatísticas e informações sobre o time de CS:GO da FURIA foram retiradas do site HLTV - https://www.hltv.org/team/8297/furia#tab-achievementsBox**

---

## 🚀 Funcionalidades

- ✅ Chat em linguagem natural com IA (API Gemini)  
- ✅ Interface simples e leve (HTML/CSS/JS)  
- ✅ Botão flutuante para abrir o chat  
- ✅ Fácil de embutir em qualquer ambiente web  
- ✅ Estrutura modular com Flask no backend  

---

## 🧱 Estrutura do Projeto

```
raiz/
├── static/              # Arquivos de estilo e scripts JS
│   ├── css
│   │   └── style.css
│   └── js
│       └── script.js
├── templates/
│   └── index.html       # Página principal com o botão e interface do chat
├── app.py               # Backend com Flask
├── chatbot.py           # Lógica dos inputs e outputs dos prompts realizados ao Gemini
├── data.py              # Lógica que trabalha com os dados retirados do site HLTV
├── furia_info.json      # Onde estão os dados retirados do site HLTV
├── poetry.lock          # Organização em Poetry
├── pyproject.toml       # Configuração do Poetry e dependências
├── .env                 # Variável de ambiente com a chave da API Gemini
└── README.md            # Documentação completa
```

---

## ⚙️ Tecnologias Utilizadas

- **Python 3.13**
- **Flask** – Framework backend
- **HTML/CSS/JavaScript** – Frontend do chatbot
- **API Gemini** – Geração de respostas com inteligência artificial
- **python-dotenv** – Leitura segura de variáveis de ambiente
- **json** – Para leitura de banco de dados sobre a FURIA local
- **Poetry** – Gerenciamento de dependências e ambiente virtual

---

## 📦 Instalação

### Pré-requisitos:
- Python **3.13** instalado  
- [Poetry](https://python-poetry.org/docs/#installation) instalado  
- Uma chave válida da API Gemini (Google AI)  

### Passos:

1. **Clone o repositório:**
```bash
git clone https://github.com/0pmm/Chatbot-FURIA.git
cd Chatbot-FURIA
```

2. **Instale as dependências com Poetry:**
```bash
poetry install
```

3. **Ative o ambiente virtual do Poetry:**
```bash
poetry shell
```

4. **Configure o arquivo `.env`:**

Crie um arquivo chamado `.env` na raiz do projeto e adicione sua chave da API:

```
GEMINI_API_KEY=sua_chave_aqui
```

5. **Execute o projeto:**
```bash
poetry run python app.py
```

6. **Acesse via navegador:**
```
http://127.0.0.1:5000
```

7. **Teste à vontade 🚀**

---

## 🔐 Segurança

- A chave da API Gemini **não deve ser exposta no frontend**.  
- Sempre mantenha o `.env` fora do versionamento (adicione no `.gitignore`).  

---

## 👤 Autor

Desenvolvido por: **Pedro Henrique Modesto Marchiotto**
