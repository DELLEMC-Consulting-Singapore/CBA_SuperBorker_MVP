# CBA_SuperBorker_MVP

# Middleware
The Flask application provids endpoints for various functionalities such as devbox creation, message handling with RabbitMQ, LDAP user validation and database interaction.

### Steps to Execute the Python Flask file :

    Python3.9 version is installed
    
To install the necessary dependencies, run the following command:

    pip install -r requirements.txt
    
### Steps to Execute the Python Flask file :

#### Update the parameter file "index.json" with RabbitMQ IP Address, RabbitMQ Port, RabbitMQ Queue Name, OSB API, Group Base DN, OSB IP, OSB Port, Database IP, Database Name, Database port and Request Number 

    "rabbitmq_host": "<RabbitMQ_IP>",
    "rabbitmq_port": <RabbitMQ_PORT>,
    "rabbitmq_queue_name": "<RabbitMQ_QUEUE_NAME>",
    "osb_api": "<OSB API>",
    "group_base_dn": "<GROUP_BASE_DN>",
    "osb_ip": "<OSB_NODE_IP>",
    "osb_port": <OSB_PORT>,
    "server" : "<MS_SQL_DATABASE_IP>",
    "database" : "<MS_SQL_DATABASE_NAME>",
    "db_port" : <DATABASE_PORT>,
    "req_number" : <REQUEST_NUMBER>

#### Update the RabbitMQ credential file "rabbitmq.txt"
Encode the Credentials of Service Account by using Base64 Encoding tool.

    base64_encoded_rabbitmq_username
    base64_encoded_rabbitmq_password

#### Update the RabbitMQ credential file "db_credentials.txt"
Encode the Credentials of Service Account by using Base64 Encoding tool.

    base64_encoded_db_username
    base64_encoded_db_password

#### Start the Service 
Run the Service Manually:

    python3 aria.py

Run the Service in background:

    nohup python3 aria.py &

#### API EndPoints 
- POST /api/devbox/create: Create a devbox with the provided JSON data.
- GET /api/rabbitmq-transaction: Receive messages from RabbitMQ.
- POST /api/ui/devbox/deploy: Initiate Aria automation from the UI.
- POST /api/devbox/deploy: Initiate Aria automation from a REST API.
- GET /api/transactions: Retrieve transaction data from the database.
- PUT /api/transactions/<id>: Update transaction data in the database.
- GET /api/update_transactions: Update transaction status in the database.
- POST /api/ldap/validate-user: Validate users via LDAP.
- POST /api/ldap/validate-user-group: Validate users against a group via LDAP.
  
For detailed information on each endpoint and its usage, please refer to the code. 
