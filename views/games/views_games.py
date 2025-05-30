from flask import render_template, request, redirect, session, flash, url_for, send_from_directory
from main import app, db
from models.models import Jogos, GameForm
from helpers.helpers import recupera_imagem, deleta_imagem
from time import time

@app.route('/')
def index():
    lista = Jogos.query.order_by(Jogos.id)
    return render_template('index.html', titulo='Jogos', jogos=lista)

@app.route('/cadastro')
def cadastro():
    if 'usuarioLogado' not in session or session['usuarioLogado'] == None:
        flash('Você precisa fazer login para acessar esta página.')
        return redirect(url_for('login', proxima=url_for('cadastro')))
    form = GameForm()
    return render_template('cadastro.html', titulo='Cadastro de Jogos', form=form)

@app.route('/editar/<int:id>')
def editar(id):
    if 'usuarioLogado' not in session or session['usuarioLogado'] == None:
        flash('Você precisa fazer login para acessar esta página.')
        return redirect(url_for('login', proxima=url_for('editar')))
    jogo = Jogos.query.filter_by(id=id).first()
    form = GameForm()
    form.nome.data = jogo.nome
    form.categoria.data = jogo.categoria
    form.console.data = jogo.console

    capa_jogo = recupera_imagem(id)
    return render_template('editar.html', titulo='Editar Jogo', id=id, capa_jogo=capa_jogo, form=form)


@app.route('/criar', methods=['POST',])
def criar():
    form = GameForm(request.form)

    if not form.validate_on_submit():
        return redirect(url_for('cadastro'))

    nome = form.nome.data
    categoria = form.categoria.data
    console = form.console.data

    jogo = Jogos.query.filter_by(nome=nome).first()

    if jogo:
        flash('Jogo já cadastrado!')
        return redirect(url_for('index'))
    
    jogo = Jogos(nome=nome, categoria=categoria, console=console)
    db.session.add(jogo)
    db.session.commit()
    flash('Jogo cadastrado com sucesso!')

    arquivo = request.files['arquivo']
    upload_path = app.config['UPLOAD_PATH']
    timestamp = time()
    arquivo.save(f'{upload_path}/capa{jogo.id}-{timestamp}.jpg')
    
    return redirect(url_for('index'))

@app.route('/atualizar', methods=['POST',])
def atualizar():
    form = GameForm(request.form)

    if form.validate_on_submit():
        jogo = Jogos.query.filter_by(id=request.form['id']).first()
        jogo.nome = form.nome.data
        jogo.categoria = form.categoria.data
        jogo.console = form.console.data

        db.session.add(jogo)
        db.session.commit()

        arquivo = request.files['arquivo']
        upload_path = app.config['UPLOAD_PATH']
        timestamp = time()
        deleta_imagem(jogo.id)
        arquivo.save(f'{upload_path}/capa{jogo.id}-{timestamp}.jpg')

    flash('Jogo atualizado com sucesso!')
    return redirect(url_for('index'))

@app.route('/deletar/<int:id>')
def deletar(id):
    if 'usuarioLogado' not in session or session['usuarioLogado'] == None:
        flash('Você precisa fazer login para acessar esta página.')
        return redirect(url_for('login', ))
    jogo = Jogos.query.filter_by(id=id).delete()
    db.session.commit()

    flash('Jogo deletado com sucesso!')
    return redirect(url_for('index'))

@app.route('/uploads/<filename>')
def image(filename):
    return send_from_directory('uploads', filename)