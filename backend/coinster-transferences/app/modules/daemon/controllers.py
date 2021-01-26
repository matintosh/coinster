from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, make_response, jsonify
                

from app import db 
from app.modules.transference.models import Transference

mod_daemon = Blueprint('daemon', __name__, url_prefix='/daemon')

def update_transaction_status(transference_id, status):
    transference = Transference.query.filter_by(id=transference_id).first()
    
    if transference:
        transference.status = status
        
        db.session.commit()