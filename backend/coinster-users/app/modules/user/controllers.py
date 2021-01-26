from flask import Blueprint, request, render_template, \
                  flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.responses import BadRequest, SuccessResponse, NotFoundError
from werkzeug.security import check_password_hash, generate_password_hash
from app.modules.user.models import User
from app import db
from flask_cors import CORS


mod_user = Blueprint('user', __name__, url_prefix='/api/v1/user')
CORS(mod_user)

@mod_user.route('/sign-up', methods=['POST'])
def sign_up():
    
    body        = request.json
    
    name        = body['name']
    email       = body['email']
    password    = body['password']
    
    user = User.query.filter_by(email=email).first()
    
    if not user:
        
        hashed_password = generate_password_hash(password)
        new_user = User(password=hashed_password, email=email, name=name)
        
        db.session.add( new_user )
        db.session.commit()

        return SuccessResponse({'user': new_user})
    
    return BadRequest("User already exists")


@mod_user.route('/me', methods=['GET'])
def me():
    user = user = User.query.first()
    
    if user:
        return SuccessResponse({ "user": user })
    else:
        return NotFoundError("User not found")
    
    
@mod_user.route('/<user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.filter_by(id=user_id).first()
    
    if user:
        return SuccessResponse({"success": user})
    else:
        return NotFoundError("User not found")