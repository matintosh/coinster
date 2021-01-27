import dataclasses
from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.auth import token_required
from app.helpers.responses import BadRequest, SuccessResponse, NotFoundError, MissingValue

from app.modules.transference.models import Transference
from app import db
import requests
from common.cross_service_helpers import validate_if_wallet_exists
from app.modules.daemon.producer import publish

mod_transference = Blueprint('transference', __name__, url_prefix='/api/v1/transference')

@mod_transference.route('/create', methods=['POST'])
def create():
    
    body               = request.json
    
    wallet_from        = body['wallet_from']
    wallet_to          = body['wallet_to']
    currency           = body['currency_id']
    amount             = body['amount']
    
    
    wallet_from_exists = validate_if_wallet_exists(wallet_from)
    wallet_to_exixts = validate_if_wallet_exists(wallet_to)
    
    if not wallet_from_exists:
        return MissingValue("wallet_from id was not found.")
    if not wallet_to_exixts:
        return MissingValue("wallet_to id was not found.")

    
    transference = Transference(wallet_from=wallet_from, wallet_to=wallet_to, currency=currency, amount=amount)

    db.session.add(transference)
    db.session.commit()
    
    publish("new_transference", dataclasses.asdict(transference))

    return SuccessResponse({'transference': transference})
    
    
    
@mod_transference.route('/me', methods=['GET'])
@token_required
def get_user_transferences():
    
