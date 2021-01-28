import dataclasses
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.auth import token_required
from app.helpers.responses import BadRequest, SuccessResponse, NotFoundError, MissingValue
from app.helpers.auth import token_required

from app.modules.transference.models import Transference
from app import db
import requests
from common.cross_service_helpers import validate_if_wallet_exists, get_user_wallets
from app.modules.daemon.producer import publish

from flask_cors import CORS

mod_transference = Blueprint('transference', __name__, url_prefix='/api/v1/transference')
CORS(mod_transference)

@mod_transference.route('/create', methods=['POST'])
@token_required
def create(current_user):
    
    body               = request.json
    
    wallet_from        = body['wallet_from']
    wallet_to          = body['wallet_to']
    currency           = body['currency_id']
    amount             = body['amount']
    
    wallet_from_exists = validate_if_wallet_exists(wallet_from)
    wallet_to_exists = validate_if_wallet_exists(wallet_to)
    
    
    print("WALLETS DATA")
    print(wallet_to_exists)
    print(wallet_from_exists)
    
    
    if 'error' in wallet_from_exists:
        return MissingValue("wallet from id was not found.")
    if 'error' in wallet_to_exists:
        return MissingValue("wallet to id was not found.")
    
    
    print(wallet_from_exists)
    
    if wallet_from_exists['wallet']['currency'] != wallet_to_exists['wallet']['currency']:
        return BadRequest("Wallets should have the same currency")

    
    if wallet_from_exists['wallet']['balance'] < int(amount):
        return BadRequest("Not enough money in the wallet")
        

    
    transference = Transference(wallet_from=wallet_from, wallet_to=wallet_to, currency=currency, amount=amount)

    db.session.add(transference)
    db.session.commit()
    
    publish("new_transference", dataclasses.asdict(transference))

    return SuccessResponse({'transference': transference})
    
@mod_transference.route('/me', methods=['GET'])
@token_required
def get_user_transferences(current_user):
    res = get_user_wallets(current_user)
    
    if res:
        wallet_ids = []
        for wallet in res['wallets']:
            wallet_ids.append(wallet['public_id'])
        
        
        outgoing_transferences = Transference.query.filter(Transference.wallet_from.in_(wallet_ids)).all()
        
        incoming_transferences = Transference.query.filter(Transference.wallet_to.in_(wallet_ids)).all()
        
        return SuccessResponse({'outgoing_transferences': outgoing_transferences, 'incoming_transferences': incoming_transferences})
    
    
