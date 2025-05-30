from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

SECRET_KEY = '1Qrfgbdf21A6a1dddf6d1'

DB_USER = 'SEU-USUARIO'
DB_PASSWORD = 'SUA-SENHA' # Coloque sua senha correta
DB_SERVER = 'IP-DO-SEU-BANCO'       # <<<< IMPORTANTE: Verifique esta linha!
DB_PORT = PORTA-DO-SEU-BANCO
DB_NAME = 'jogoteca'
DB_DIALECT = 'mysql+mysqlconnector'

SQLALCHEMY_DATABASE_URI = \
    f'{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:{DB_PORT}/{DB_NAME}'

UPLOAD_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'uploads')
