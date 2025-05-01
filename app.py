from flask import Flask, render_template, request, jsonify
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

furia_context = f"""
INFORMAÇÕES DA FURIA ESPORTS CSGO:
Jogadores: {', '.join(furia_data['players'])}
Títulos: {', '.join(furia_data['titles'])}
Técnico: {furia_data['coach']}
Últimas 5 Partidas: {', '.join(furia_data['last5-matches'])}
História: {furia_data['history']}
Total de Mapas: {furia_data['tmaps']}
Total de Vitórias: {furia_data['twins']}
Total de Empates: {furia_data['tdraws']}
Total de Perdas: {furia_data['tlosses']}
Total de Kills: {furia_data['tkills']}
Total de Mortes: {furia_data['tdeaths']}
Total de Partidas: {furia_data['trouds']}
Média kill por mortes: {furia_data['kd']}
Site: {furia_data['site']}
X: {furia_data['twitter']}
Instagram: {furia_data['instagram']}
Próximos Campeonatos: {furia_data['NextChamps']}
Winrate Médiao: {furia_data['wrate']}
Winrate por Mapa: {furia_data['Wratemaps']}
Melhor Resultado em Major: {furia_data['bestmajor']}
Ranking da Valve: {furia_data['valve-rank']}
Ranking Mundial: {furia_data['world-rank']}
Melhor posição no Ranking Mundial: {furia_data['bestw-rank']}
"""

historico_conversa = []
MAX_CONTEXTO = 3

model = genai.GenerativeModel(model_name="gemini-2.0-flash-lite")

system_instruction_base = f"""Você é um chatbot divertido da FURIA Esports e fanático por tal. Que deve servir como guia para o usuário, buscando o atualizar sobre jogos, feitos e dados da Equipe FURIA CSGO, de forma direta, sem textos cansativos e sem negrito, itálico e afins.

Utilize as seguintes informações sobre a FURIA para responder às perguntas do usuário, mantendo um contexto das conversas anteriores se possível. O histórico da conversa é:
{{historico_contexto}}
{furia_context}
"""

app = Flask(__name__)

@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/perguntar", methods=["POST"])
def perguntar():
    global historico_conversa
    pergunta = request.form["mensagem"]

    if pergunta:
        historico_conversa.append({"role": "user", "content": pergunta})
        while len(historico_conversa) > MAX_CONTEXTO * 2:  # Limita a 3 interações (pergunta+resposta)
            historico_conversa.pop(0)

        historico_contexto_str = "\n".join([f"{item['role']}: {item['content']}" for item in historico_conversa])
        prompt_completo = system_instruction_base.format(historico_contexto=historico_contexto_str)

        contents = [
            {"role": "user", "parts": [prompt_completo]},
            {"role": "user", "parts": [pergunta]}
        ]

        response = model.generate_content(contents, generation_config={'temperature': 0.5})
        resposta = response.text

        historico_conversa.append({"role": "model", "content": resposta})

        return jsonify({"resposta": resposta})
    return jsonify({"erro": "Nenhuma mensagem recebida"}), 400

if __name__ == "__main__":
    print("Iniciando servidor Flask...")
    app.run(debug=True)