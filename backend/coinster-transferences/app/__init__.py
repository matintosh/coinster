import os
from flask import Flask, render_template

from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config.from_object('common.config')

db = SQLAlchemy(app)

from app.modules.transference.controllers import mod_transference as transference_modules
from app.modules.daemon.controllers import mod_daemon as daemon_modules

app.register_blueprint(transference_modules)
app.register_blueprint(daemon_modules)

app.app_context().push()

db.create_all()

from app.modules.daemon.consumer import channel



RUN_QUEUE = os.environ.get('RUN_QUEUE', 'False') 

if RUN_QUEUE == 'True':
    print("Running queue consumer for transferences...")
    channel.start_consuming()
    channel.close()
