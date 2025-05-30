from main import app
from flask import render_template, request, redirect, session, url_for, flash
from models.models import Usuarios, UserForm
from flask_bcrypt import check_password_hash

@app.route('/login')
def login():
    proxima = request.args.get('proxima')
    if not proxima or proxima == 'None':
        proxima = url_for('index')
    form = UserForm()
    return render_template('login.html', proxima=proxima, form=form)

@app.route('/autenticar', methods=['POST',])
def autenticar():
    form = UserForm(request.form)

    proxima_redirect_url = request.form.get('proxima')
    if not proxima_redirect_url or proxima_redirect_url == 'None' or not proxima_redirect_url.strip():
        proxima_redirect_url = url_for('index')

    usuario = Usuarios.query.filter_by(nickname=form.nickname.data).first()

    senha_valida = check_password_hash(usuario.senha, form.senha.data)
    if usuario and senha_valida:
        session['usuarioLogado'] = usuario.nickname
        flash(f'Usuário {usuario.nome} logado com sucesso!')
        proxima_pagina = request.form['proxima']
        if proxima_pagina:
            return redirect(proxima_pagina)
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