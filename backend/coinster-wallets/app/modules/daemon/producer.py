import pika, json
from common.config import RABBIT_MQ_URL

params = pika.URLParameters(RABBIT_MQ_URL)

connection = pika.BlockingConnection(params)

channel = connection.channel()

def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='transference', body=json.dumps(body), properties=properties)