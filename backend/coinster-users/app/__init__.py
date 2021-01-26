from flask import Flask, render_template

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object('common.config')

db = SQLAlchemy(app)

from app.modules.user.controllers import mod_user as user_modules

app.register_blueprint(user_modules)

db.create_all()
