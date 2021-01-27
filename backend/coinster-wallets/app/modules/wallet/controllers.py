from flask import Blueprint, request, render_template, \
    flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.responses import BadRequest, SuccessResponse, NotFoundError
from werkzeug.security import check_password_hash, generate_password_hash
from app.modules.wallet.models import Wallet
from app.helpers.auth import token_required
from app import db
import requests
from common.cross_service_helpers import validate_if_user_exists, get_currencies
from flask_cors import CORS

mod_wallet = Blueprint('wallet', __name__, url_prefix='/api/v1/wallet')
CORS(mod_wallet)


@mod_wallet.route('/create', methods=['POST'])
@token_required
def create(current_user):

    body = request.json

    user = current_user
    currency = body['currency_id']
    balance = body['balance']

    # user_exists = validate_if_user_exists(user)

    # if not user_exists:
    #     return NotFoundError("User id does not belong to any user")

    wallet = Wallet(user_id=user, currency=currency, initial_balance=balance)

    db.session.add(wallet)
    db.session.commit()

    return SuccessResponse({'wallet': wallet})


@mod_wallet.route('/list', methods=['GET'])
@token_required
def list_user_wallets_protected(user_id):

    wallets = Wallet.query.filter_by(user_id=user_id).all()
    currency_data = get_currencies()

    return SuccessResponse({'wallets': wallets, 'currency_data': currency_data})

@mod_wallet.route('/user/<user_id>', methods=['GET'])
def list_user_wallets(user_id):

    wallets = Wallet.query.filter_by(user_id=user_id).all()
    currency_data = get_currencies()

    return SuccessResponse({'wallets': wallets, 'currency_data': currency_data})



@mod_wallet.route('/<wallet_id>', methods=['GET'])
def wallet_exists(wallet_id):

    wallet = Wallet.query.filter_by(id=wallet_id).first()

    if wallet:
        return SuccessResponse({'wallet': wallet})
    else:
        return NotFoundError("Wallet not found")


@mod_wallet.route('', methods=['DELETE'])
@token_required
def delete_wallet(current_user):

    body = request.json

    wallet_id = body['wallet_id']
    wallet = Wallet.query.filter_by(
        public_id=wallet_id, user_id=current_user).first()

    if wallet:
        db.session.delete(wallet)
        db.session.commit()

        return SuccessResponse({'wallet_deleted': wallet_id})
    else:
        return NotFoundError("Wallet not found")
