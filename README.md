
# 🧠 Chatbot FÚRIA – Guia do Time de CS2

O **Chatbot FÚRIA** é uma aplicação leve e incorporável que simula uma conversa com um bot treinado para responder perguntas sobre o time de CS2 da FURIA, utilizando inteligência artificial via API Gemini.  
O projeto é baseado na comunicação entre o backend em Python e o frontend, sendo o Python responsável por realizar as requisições à API da Gemini, utilizando o modelo gemini-2.0-flash-lite. O backend envia um contexto com instruções específicas para que a API atue como um guia de respostas sobre o time de CS2 da FURIA, incluindo as três últimas perguntas feitas pelo usuário para manter a coerência e o contexto das respostas. Além disso, o sistema interpreta dados e estatísticas armazenados em arquivos JSON para enriquecer as respostas.
No frontend, ao clicar no botão com o logotipo da FURIA localizado no canto inferior direito, é exibido o menu de conversação. Quando uma pergunta é enviada — seja ao clicar no botão de envio ou pressionar Enter — ela é transmitida ao backend via método POST. Assim que a resposta é recebida, ela é inserida em uma nova div criada dinamicamente pelo JavaScript, permitindo que as mensagens sejam atualizadas de forma direta e dinâmica, proporcionando uma experiência fluida ao usuário.
No momento está hospedado em um plano gratuito no render, portanto após a inatividade ele entra em modo sleep, e quando houver um novo acesso, até q ocorra sua ativação, decorre alguns minutos, todavia funciona totalmente como esperado!

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
|   |  └── style.css
│   └── js
|      └── script.js
├── templates/
│   └── index.html       # Página principal com o botão e interface do chat
├── app.py               # Backend com Flask
├── .env                 # Variável de ambiente com a chave da API Gemini
├── requirements.txt     # Lista de dependências Python
├── Procfile             # Documento para deploy no Render
├── runtime.exe          # Documento para deploy no Render
└── README.md            # Documentação completa
```

---

## ⚙️ Tecnologias Utilizadas

- **Python 3.13**
- **Flask** – Framework backend
- **HTML/CSS/JavaScript** – Frontend do chatbot
- **API Gemini** – Geração de respostas com inteligência artificial
- **dotenv** – Leitura segura de variáveis de ambiente
- **json** – Para leitura de banco de dados sobre a Furia Local
---

## 📦 Instalação

### Pré-requisitos:
- Python 3.13 instalado
- Uma chave válida da API Gemini (Google AI)
- Bibliotecas: flask, dotenv, google.generativeai, os, json

### Passos:

1. **Clone o repositório:**
```bash
git clone https://github.com/0pmm/Chatbot-FURIA.git
cd Chatbot-FURIA
```
2. **Instale as dependências:**
```bash
pip install -r requirements.txt
```

3. **Configure o arquivo `.env`:**

Dentro do arquivo `.env` na raiz do projeto, coloco sua chave da API:

```
GEMINI_API_KEY=sua_chave_aqui
```

5. **Execute o projeto:**
```bash
python app.py
```

6. **Acesse via navegador:**

```
Running on http://127.0.0.1:5000
```
7. **Teste a vontade**
---

## 🔐 Segurança

- A chave da API Gemini **não deve ser exposta no frontend**. Mantenha-a protegida no `.env`.

---

## 👤 Autor

Desenvolvido por: **Pedro Henrique Modesto Marchiotto**
