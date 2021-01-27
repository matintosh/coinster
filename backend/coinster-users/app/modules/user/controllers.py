from flask import Blueprint, request, render_template, \
    flash, g, session, redirect, url_for, make_response, jsonify
from app.helpers.auth import get_token, token_required
from app.helpers.responses import BadRequest, SuccessResponse, NotFoundError, MissingValue, PermissionDenied
from werkzeug.security import check_password_hash, generate_password_hash
from app.modules.user.models import User
from datetime import datetime, timedelta
import jwt
from common.config import SECRET_KEY
from app import db
from flask_cors import CORS

mod_user = Blueprint('user', __name__, url_prefix='/api/v1/user')
CORS(mod_user)


@mod_user.route('/sign-up', methods=['POST'])
def sign_up():

    body = request.json

    first_name = body['first_name']
    last_name = body['last_name']
    email = body['email']
    password = body['password']

    user = User.query.filter_by(email=email).first()

    if not user:

        hashed_password = generate_password_hash(password)
        new_user = User(password=hashed_password, email=email,
                        first_name=first_name, last_name=last_name)

        db.session.add(new_user)
        db.session.commit()

        token = get_token(new_user.public_id)

        return SuccessResponse({'user': new_user, "token": token.decode('UTF-8')})

    return BadRequest("User already exists")


@mod_user.route('/sign-in', methods=['POST'])
def sign_in():

    body = request.json

    email = body['email']
    password = body['password']

    if not email:
        return MissingValue("Missing email")
    if not password:
        return MissingValue("Missing password")

    user = User.query.filter_by(email=email).first()

    if not user:
        return PermissionDenied("User or passowrd incorrect.")

    if check_password_hash(user.password, password):
        token = get_token(user.public_id)

        return SuccessResponse({'token': token.decode('UTF-8')})

    return PermissionDenied("User or passowrd incorrect.")


@mod_user.route('/me', methods=['GET'])
@token_required
def me(current_user):
    print("EL CURRENT USER")
    print(current_user)
    user = user = User.query.filter_by(public_id=current_user).first()

    if user:
        return SuccessResponse({"user": user})
    else:
        return NotFoundError("User not found")


@mod_user.route('/<user_id>', methods=['GET'])
def get_user(user_id):

    user = User.query.filter_by(public_id=user_id).first()

    if user:
        return SuccessResponse({"success": user})
    else:
        return NotFoundError("User not found")
