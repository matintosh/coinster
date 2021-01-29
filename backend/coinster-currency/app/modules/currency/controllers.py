from flask import Blueprint, request, render_template, \
    flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.responses import BadRequest, SuccessResponse
from common.cross_service_helpers import get_transferences_by_currency
from app import db
from app.modules.currency.models import Currency
from flask_cors import CORS


mod_currency = Blueprint('currency', __name__, url_prefix='/api/v1/currency')
CORS(mod_currency)


@mod_currency.route('', methods=['POST'])
def create():

    body = request.json
    name = body['name']

    currency = Currency.query.filter_by(name=name).first()

    if not currency:

        new_currency = Currency(name=name)

        db.session.add(new_currency)
        db.session.commit()

        return SuccessResponse({'currency_list': Currency.query.all()})

    return BadRequest("Currency already exists")


@mod_currency.route('', methods=['GET'])
def currency_list():
    currency_list = Currency.query.all()

    return SuccessResponse({
        "currency_list": currency_list
    })


@mod_currency.route('/usage', methods=['GET'])
def usage():
    currency_list = Currency.query.all()

    result = []

    print(currency_list)
    for currency_item in currency_list:
    
        item = currency_item.__dict__
        currency_id   = item['id']
        currency_name = currency_item.name
        currency_transferences = get_transferences_by_currency(currency_id)
        currency_data = {
            'id': currency_id,
            'name': currency_name,
            'transferences': currency_transferences['transferences']
        }

        result.append(currency_data)
    
    
    return SuccessResponse({
        "currency_usage": result
    })
