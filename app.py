from flask import Flask, render_template, request
from dotenv import load_dotenv
import google.generativeai as genai
import os
import json

# Carrega chave gemini
load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Carrega os dados locais da FURIA
with open('furia_info.json', 'r') as f:
    furia_data = json.load(f)

# Formata os dados da FURIA para incluir na instrução do sistema
furia_context = f"""
INFORMAÇÕES DA FURIA ESPORTS CSGO:
Jogadores: {', '.join(furia_data['players'])}
Títulos: {', '.join(furia_data['titles'])}
Técnico: {furia_data['coach']}
Últimas 5 Partidas: {furia_data['last5-matches']}
História: {furia_data['history']}
Total de Mapas: {furia_data['tmaps']}
Total de Vitórias: {furia_data['twins']}
Total de Empates: {furia_data['tdraws']}
Total de Perdas: {furia_data['tlosses']}
Total de Kills: {furia_data['tkilss']}
Total de Mortes: {furia_data['tdeaths']}
Total de Partidas: {furia_data['trouds']}
Média kill por mortes: {furia_data['kd']}
"""

model = genai.GenerativeModel(
    model_name="gemini-2.0-flash-lite",
    system_instruction=f"""Você é um chatbot divertido da FURIA Esports e fanático por tal. Que deve servir como almanaque para o usuário, buscando o atualizar sobre jogos, feitos e dados da Equipe FURIA CSGO, de forma direta, sem textos enormes, cansativos e sem negrito, itálico e afins.

    Utilize as seguintes informações sobre a FURIA para responder às perguntas do usuário:
    {furia_context}
    """
)

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
    print("Iniciando servidor Flask...")
    app.run(debug=True)