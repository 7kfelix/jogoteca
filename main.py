from flask import Flask, render_template, request, redirect, session, url_for, flash

class Jogo:
    def __init__(self, nome, genero, console):
        self.nome = nome
        self.genero = genero
        self.console = console

class Usuario:
    def __init__(self, nome, email, senha):
        self.nome = nome
        self.email = email
        self.senha = senha

usuario1 = Usuario("Marcelo Felix", "marcelofelix@teste.com", "1234")
usuario2 = Usuario("Marcos Jordan", "marcosjordan@teste.com", "1234")
usuario3 = Usuario("Mauricio Silva", "mauriciolouco@teste.com", "bolachatrakinas")

usuarios = {usuario1.email: usuario1,
            usuario2.email: usuario2,
            usuario3.email: usuario3
            }

app = Flask(__name__)
app.secret_key = '1Qrfgbdf21A6a1dddf6d1'

jogo1 = Jogo('Tetris', 'Puzzle', 'Atari')
jogo2 = Jogo('God of War', 'Hack n Slash', 'Playstation 2')
jogo3 = Jogo('Mortal Kombat', 'Luta', 'Arcade')

lista = [jogo1, jogo2, jogo3]

@app.route('/')
def index():
    return render_template('index.html', titulo='Jogos', jogos=lista)
    
@app.route('/cadastro')
def cadastro():
    if 'usuarioLogado' not in session or session['usuarioLogado'] == None:
        flash('Você precisa fazer login para acessar esta página.')
        return redirect(url_for('login', proxima=url_for('cadastro')))
    return render_template('cadastro.html', titulo='Cadastro de Jogos')

@app.route('/criar', methods=['POST',])
def criar():
    nome = request.form['nome']
    genero = request.form['genero']
    console = request.form['console']

    jogo = Jogo(nome, genero, console)
    lista.append(jogo)
    
    return redirect(url_for('index'))

@app.route('/login')
def login():
    proxima = request.args.get('proxima')
    return render_template('login.html')

@app.route('/autenticar', methods=['POST',])
def autenticar():
    if request.form['usuario'] in usuarios:
        usuario = usuarios[request.form['usuario']]
        if request.form['senha'] == usuario.senha:
            session['usuarioLogado'] = request.form['usuario']
            flash(session['usuarioLogado'] + ' logado com sucesso. Bem-vindo!')
            proximaPagina = request.form['proxima']
            if proximaPagina: 
                return redirect(proximaPagina)
            else:
                return redirect(url_for('index'))
    else:
        flash('Usuário ou senha inválidos.')
        return redirect(url_for('login'))
    
@app.route('/logout')
def logout():
    session['usuarioLogado'] = None
    flash('Logout efetuado com sucesso!')
    return redirect(url_for('index'))

app.run(debug=True)