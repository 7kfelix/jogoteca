import os
from main import app

def recupera_imagem(id):
    for nome_arquivo in os.listdir(app.config['UPLOAD_PATH']):
        if f'capa{id}' in nome_arquivo:
            return nome_arquivo
        
    return 'uploads/capa_padrao.jpg'

def deleta_imagem(id):
    arquivo = recupera_imagem(id)
    if arquivo != 'uploads/capa_padrao.jpg':
        os.remove(os.path.join(app.config['UPLOAD_PATH'], arquivo))