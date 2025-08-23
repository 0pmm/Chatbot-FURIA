from data import csgo_data
import google.generativeai as genai
import os

class ChatbotFuria:
    MAX_CONTEXTO = 3

    def __init__(self, api_key):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name="gemini-2.0-flash-lite")
        self.historico_conversa = []

        furia_contexto = csgo_data()

        self.system_instruction_base = f"""Você é um chatbot divertido da FURIA Esports e fanático por tal. Que deve servir como guia para o usuário, buscando o atualizar sobre jogos, feitos e
        dados da Equipe FURIA CSGO, de forma direta, sem textos cansativos e sem negrito, itálico e afins. Utilize as seguintes informações sobre a FURIA para responder às perguntas do 
        usuário, mantendo um contexto das conversas anteriores se possível. O histórico da conversa é:
        {{historico_contexto}}
        {furia_contexto}
        """
        
    def perguntar(self, pergunta):
        self.historico_conversa.append({"role": "user", "content": pergunta})
        if len(self.historico_conversa) > self.MAX_CONTEXTO * 2:
            self.historico_conversa.pop(0)
        
        historico_str = "\n".join(f"{item['role']}: {item['content']}" for item in self.historico_conversa)
        prompt = self.system_instruction_base.format(historico_contexto = historico_str)

        contents = [
            {"role": "user", "parts": [prompt]},
            {"role": "user", "parts": [pergunta]}
        ]

        output = self.model.generate_content(contents, generation_config={'temperature': 0.5})    
        resposta = output.text

        self.historico_conversa.append({"role": "model", "content": resposta})

        return resposta
