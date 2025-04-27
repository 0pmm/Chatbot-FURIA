from flask import Flask, render_template, request
from dotenv import load_dotenv
import google.generativeai as genai
import os

# Carrega chave gemini
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Modelo com instrução
model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-lite",
    system_instruction="Você é um chatbot divertido da FURIA Esports e fanático por tal. Que deve servir como almanaque para o usuario, buscando o atualizar sobre jogos, feitos e dados da Equipe FURIA CSGO, de forma direta, sem textos enormes e cansativos."
)

# renderiza o html no servidor Flask
app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    resposta = None
    if request.method == "POST":
        pergunta = request.form["message"]
        if pergunta:
            response = model.generate_content(pergunta)
            resposta = response.text
    return render_template("index.html", response=resposta)

if __name__ == "__main__":
    print("Iniciando servidor Flask...")  # <- pra confirmar se chegou aqui
    app.run(debug=True)
