from flask import Flask, request, jsonify
from flask_cors import CORS
import pika
import requests

app = Flask(__name__)
CORS(app)

# RabbitMQ connection parameters
rabbitmq_params = {
    'host': '10.118.168.237',  # Change this to your RabbitMQ server host
    'port': 5672,
    'queue_name': 'test_queue',
}

# Establish connection to RabbitMQ
credentials = pika.PlainCredentials(username='test', password='test@123')

connection = pika.BlockingConnection(pika.ConnectionParameters(
    rabbitmq_params['host'],
    rabbitmq_params['port'],
    '/',
    credentials
))
channel = connection.channel()
channel.queue_declare(queue=rabbitmq_params['queue_name'], durable=True)

# Route to handle POST requests
@app.route('/api/transaction', methods=['POST'])
def send_message():
    try:
        # Get JSON data from the request
        data = request.get_json()

        # Ensure the payload is not empty
        if not data:
            return jsonify({'error': 'Empty payload'}), 400

        # Convert the payload to a string
        message_body = str(data)

        # Publish the message to RabbitMQ
        channel.basic_publish(
            exchange='',
            routing_key=rabbitmq_params['queue_name'],
            body=message_body,
            properties=pika.BasicProperties(
                delivery_mode=2,  # Make the message persistent
            )
        )

        # Include the JSON data in the response
        response_data = {'message': 'Request created successfully', 'data': data}
        return jsonify(response_data), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Route to handle GET requests
@app.route('/api/transaction', methods=['GET'])
def receive_message():
    try:
        # Get a message from RabbitMQ with auto-acknowledgment
        method_frame, header_frame, body = channel.basic_get(queue=rabbitmq_params['queue_name'], auto_ack=False)

        if method_frame:
            # Convert the message body to JSON
            message_data = body.decode('utf-8')
            response_data = {'message': 'Message received from RabbitMQ', 'data': message_data}
            return jsonify(response_data), 200
        else:
            return jsonify({'message': 'No messages in the queue'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='10.118.168.237', port=5000, debug=True)
