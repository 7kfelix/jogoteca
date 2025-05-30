from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

SECRET_KEY = '1Qrfgbdf21A6a1dddf6d1'

DB_USER = 'root'
DB_PASSWORD = '10451236aA%40' # Coloque sua senha correta
DB_SERVER = '127.0.0.1'       # <<<< IMPORTANTE: Verifique esta linha!
DB_PORT = 3306
DB_NAME = 'jogoteca'
DB_DIALECT = 'mysql+mysqlconnector'

SQLALCHEMY_DATABASE_URI = \
    f'{DB_DIALECT}://{DB_USER}:{DB_PASSWORD}@{DB_SERVER}:{DB_PORT}/{DB_NAME}'

UPLOAD_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'uploads')