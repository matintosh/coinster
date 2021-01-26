from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.responses import BadRequest, SuccessResponse, NotFoundError
from werkzeug.security import check_password_hash, generate_password_hash
from app.modules.wallet.models import Wallet
from app import db
import requests
from common.cross_service_helpers import validate_if_user_exists

mod_wallet = Blueprint('wallet', __name__, url_prefix='/wallet')


@mod_wallet.route('/create', methods=['POST'])
def create():
    
    body        = request.json
    
    user        = body['user_id']
    currency    = body['currency_id']
    
    user_exists = validate_if_user_exists(user)
    
    if not user_exists:
        return NotFoundError("User id does not belong to any user")    
    
    wallet = Wallet(user_id=user, currency=currency)

    db.session.add( wallet )
    db.session.commit()

    return SuccessResponse({'wallet': wallet})
    

@mod_wallet.route('/user/<user_id>', methods=['GET'])
def list_user_wallets(user_id):
    
    wallets = Wallet.query.filter_by(user_id=user_id).all()

    return SuccessResponse({'wallets': wallets})
    
    
@mod_wallet.route('/<wallet_id>', methods=['GET'])
def wallet_exists(wallet_id):
    
    wallet = Wallet.query.filter_by(id=wallet_id).first()

    if wallet:
        return SuccessResponse({'wallet': wallet})
    else:
        return NotFoundError("Wallet not found")
    