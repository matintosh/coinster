from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, make_response, jsonify
                  
from app.helpers.responses import BadRequest, SuccessResponse

from app import db

from app.modules.currency.models import Currency

mod_currency = Blueprint('currency', __name__, url_prefix='/currency')

@mod_currency.route('', methods=['POST'])
def create():

    body = request.json
    name = body['name']
    
    currency = Currency.query.filter_by(name=name).first()
    
    if not currency:

        new_currency = Currency(name=name)
        
        db.session.add( new_currency )
        db.session.commit()
        
        return SuccessResponse({'currency_list': Currency.query.all()})
    
    return BadRequest("Currency already exists")


@mod_currency.route('', methods=['GET'])
def currency_list():
    currency_list = Currency.query.all()
    
    return SuccessResponse({
        "currency_list": currency_list
    })
    