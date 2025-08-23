import json

def csgo_data():
    with open('furia_info.json', 'r') as f:
        furia_data = json.load(f)

    furia_dados = f"""
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

    return furia_dados