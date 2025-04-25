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
    system_instruction="Você é um chatbot divertido e fanático pela FURIA Esports. Fale como torcedor e responda com emoção e memes, se possível."
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
