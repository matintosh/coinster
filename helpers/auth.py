from functools import wraps
from flask import make_response, jsonify, request
from common.config import SECRET_KEY
from datetime import datetime, timedelta
import jwt


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return jsonify({'message': 'Token is missing !!'}), 401

        try:

            data = jwt.decode(token, SECRET_KEY)
            current_user = data['public_id']
        except:
            return jsonify({
                'message': 'Token is invalid !!'
            }), 401

        return f(current_user, *args, **kwargs)

    return decorated


def get_token(public_id):
    return jwt.encode({
        'public_id': public_id,
        'exp': datetime.utcnow() + timedelta(minutes=30)
    }, SECRET_KEY)
