import pika, json
from .controllers import validate_transference

params = pika.URLParameters('amqps://odszlaso:ZIzn4zLKdWaVoY48yhzcotY1LL75MPhA@orangutan.rmq.cloudamqp.com/odszlaso')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='wallet')

def callback(ch, method, properties, body):

    body = json.loads(body)
    
    validate_transference(body)
    

channel.basic_consume(queue='wallet', on_message_callback=callback, auto_ack=True)



