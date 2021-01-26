import pika, json
from .controllers import update_transaction_status

params = pika.URLParameters('amqps://odszlaso:ZIzn4zLKdWaVoY48yhzcotY1LL75MPhA@orangutan.rmq.cloudamqp.com/odszlaso')

connection = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='transference')

def callback(ch, method, properties, body):
    print(json.loads(body))
    

channel.basic_consume(queue='transference', on_message_callback=callback, auto_ack=True)



