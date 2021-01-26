import os

DEBUG = True

BASE_DIR = os.path.abspath(os.path.dirname(__file__))  

SQLALCHEMY_DATABASE_URI = 'postgres://ngejcwqvmihpvo:a1dfa5cdc3666d121c825586d8c89a3f913dd0c035b9e1452689d6d8703eabe7@ec2-52-72-190-41.compute-1.amazonaws.com:5432/dek773l47ple2r'

DATABASE_CONNECT_OPTIONS = {}

CSRF_ENABLED     = True
CSRF_SESSION_KEY = "coinster_secret"

SECRET_KEY = "coinster_secret"

RABBIT_MQ_URL = 'amqps://odszlaso:ZIzn4zLKdWaVoY48yhzcotY1LL75MPhA@orangutan.rmq.cloudamqp.com/odszlaso'