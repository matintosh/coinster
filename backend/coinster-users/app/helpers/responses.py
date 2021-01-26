# Import flask dependencies
from flask import make_response, jsonify


def NotFoundError(message):
    return make_response(jsonify({'error': message}), 404)

def MissingValue(message):
    return make_response(jsonify({'error': message}), 422)

def PermissionDenied(message):
    return make_response(jsonify({'error': message}), 401)

def BadRequest(message):
    return make_response(jsonify({'error': message}), 400)

def SuccessResponse(body):
    return make_response(jsonify(body), 200)