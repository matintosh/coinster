from flask import Flask, render_template

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object('common.config')

db = SQLAlchemy(app)

from app.modules.currency.controllers import mod_currency as currency_module

app.register_blueprint(currency_module)

db.create_all()
