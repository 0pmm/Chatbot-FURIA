from dotenv import load_dotenv
from flask import Flask, render_template, request, jsonify
from chatbot import ChatbotFuria
import os

app = Flask(__name__)

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")
bot = ChatbotFuria(api_key=api_key)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/perguntar", methods = ["POST"])
def conversa():
    prompt_usuario = request.form.get("mensagem")

    if not prompt_usuario:
        return jsonify({"erro": "Nenhuma mensagem recebida"}), 400
    
    output_bot = bot.perguntar(prompt_usuario)
    return jsonify({"resposta": output_bot})

if __name__ == "__main__":
    print("Iniciando o servidor Flask do Chatbot da Furia...")
    app.run(debug = True)