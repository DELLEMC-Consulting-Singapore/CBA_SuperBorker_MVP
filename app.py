from flask import Flask, request, jsonify
from flask_cors import CORS
import pika
import requests
import json
import base64

app = Flask(__name__)
CORS(app)

# Read RabbitMQ parameters from JSON file
def read_rabbitmq_config(file_path):
    with open(file_path, 'r') as file:
        config_data = json.load(file)
    return config_data

# Get RabbitMQ parameters
data = read_rabbitmq_config('/opt/python_rabbitmq/CBA_SuperBorker_MVP/index.json')

# Read the Encoded RabbitMQ credentials
with open("/opt/python_rabbitmq/CBA_SuperBorker_MVP/rabbitmq.txt") as f:
     lines = f.readlines()
     f.close()

# Decode the RabbitMQ credentials
def decode_rmq_credentials():
    decoded_user = base64.b64decode(lines[0].strip()).decode('UTF-8')
    decoded_pass = base64.b64decode(lines[1].strip()).decode('UTF-8')
    return decoded_user, decoded_pass

rmq_user, rmq_pass = decode_rmq_credentials()

# Establish connection to RabbitMQ
credentials = pika.PlainCredentials(username=rmq_user, password=rmq_pass)

connection = pika.BlockingConnection(pika.ConnectionParameters(
    data['rabbitmq_host'],
    data['rabbitmq_port'],
    '/',
    credentials
))
channel = connection.channel()
channel.queue_declare(queue=data['rabbitmq_queue_name'], durable=True)

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
            routing_key=data['rabbitmq_queue_name'],
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
        method_frame, header_frame, body = channel.basic_get(queue=data['rabbitmq_queue_name'], auto_ack=False)

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
    app.run(host=data['rabbitmq_host'], port=5000, debug=True)
