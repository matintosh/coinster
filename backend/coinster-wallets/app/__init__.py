import os

from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy

from app.modules.daemon.consumer import channel
from app.modules.wallet.controllers import mod_wallet as wallet_modules

app = Flask(__name__)

app.config.from_object('common.config')

db = SQLAlchemy(app)


app.register_blueprint(wallet_modules)

db.create_all()


RUN_QUEUE = os.environ.get('RUN_QUEUE', 'False') 

if RUN_QUEUE == 'True':
    print("Running queue consumer for wallet...")
    channel.start_consuming()
    channel.close()