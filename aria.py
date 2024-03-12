from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from ldap3 import Server, Connection, SIMPLE, SUBTREE
import requests
import json
import pymssql
import random
import string
from datetime import datetime
import base64
import pika

app = Flask(__name__)

cors = CORS(app)

##### Read Parameter file "index.json" and return the content of the file #####
def read_index_json():
    file_path = "/apps/aria_automation/index.json"
    try:
        with open(file_path, 'r') as file:
            index_data = json.load(file)
            return index_data
    except FileNotFoundError:
        return f"File '{file_path}' not found."
    except json.JSONDecodeError as e:
        return f"Error decoding JSON: {e}"

index_data = read_index_json()
osb_api = index_data.get('osb_api')
osb_ip = index_data.get('osb_ip')
osb_port = index_data.get('osb_port')
group_dn = index_data.get('group_base_dn')
server = index_data.get('server')
database = index_data.get('database')
db_port = index_data.get('db_port')
rabbitmq_host = index_data.get('rabbitmq_host')
rabbitmq_port = index_data.get('rabbitmq_port')
rabbitmq_queue_name = index_data.get('rabbitmq_queue_name')
req_number = index_data.get('req_number')

##### Read MS SQL Database credentials file "db_credentials.txt" and decode using base64 and return the decoded DB credentials #####
def read_db_creds():
    creds_file_path = "/apps/aria_automation/db_credentials.txt"
    try:
        with open(creds_file_path, 'r') as t:
            lines = t.readlines()
            db_username = base64.b64decode(lines[0].strip()).decode('utf-8')
            db_password = base64.b64decode(lines[1].strip()).decode('utf-8')
            return db_username, db_password
    except FileNotFoundError:
        return f"Credentials file '{creds_file_path}' not found."
    except Exception as e:
        return f"Error reading database credentials: {e}"

db_username, db_password = read_db_creds()

##### Read RabbitMQ credentials file "rabbitmq.txt" and decode using base64 and return the decoded DB credentials #####
def read_rmq_creds():
    creds_file_path = "/apps/aria_automation/rabbitmq.txt"
    try:
        with open(creds_file_path, 'r') as t:
            lines = t.readlines()
            rmq_username = base64.b64decode(lines[0].strip()).decode('utf-8')
            rmq_password = base64.b64decode(lines[1].strip()).decode('utf-8')
            return rmq_username, rmq_password
    except FileNotFoundError:
        return f"Credentials file '{creds_file_path}' not found."
    except Exception as e:
        return f"Error reading rabbitmq credentials: {e}"

rmq_username, rmq_password = read_rmq_creds()

##### Generate the random string #####
def generate_random_string(length):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits  
    # Generate the random string
    random_string = ''.join(random.choice(characters) for _ in range(length))
    return random_string

############# RABBITMQ#############
##### Establish connection to RabbitMQ #####

credentials = pika.PlainCredentials(username=rmq_username, password=rmq_password)

connection = pika.BlockingConnection(pika.ConnectionParameters(
    host=rabbitmq_host,
    port=rabbitmq_port,
    virtual_host='/',
    credentials=credentials
))
channel = connection.channel()
channel.queue_declare(queue=rabbitmq_queue_name, durable=True)

# Route to handle POST requests
@app.route('/api/devbox/create', methods=['POST'])
def send_message():
    try:
        # Get JSON data from the request
        data = request.get_json()
        data = json.dumps(data)

        # Ensure the payload is not empty
        if not data:
            return jsonify({'error': 'Empty payload'}), 400

        # Publish the message to RabbitMQ
        channel.basic_publish(
            exchange='',
            routing_key=rabbitmq_queue_name,
            body=data,
            properties=pika.BasicProperties(
                delivery_mode=2,  # Make the message persistent
            )
        )

        # Include the JSON data in the response
        response_data = {'message': 'Request created successfully'}
        return jsonify(response_data), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

##### This function handles requests to create a devbox. Process the request data, validates it, performs the deployment and insert data into the database with the deployment details #####
@app.route('/api/rabbitmq-transaction', methods=['GET'])
def receive_message():
    try:
        # Get a message from RabbitMQ with auto-acknowledgment
        method_frame, header_frame, body = channel.basic_get(queue="test", auto_ack=True)

        if method_frame:
            # Convert the message body to JSON
            message_data = body.decode('utf-8')
            data = json.loads(message_data)
            # Based on the source, the devbox deployment URL is called. 
        if data['source'] == "API":
            deployment_url = f'http://{osb_ip}:{osb_port}/api/devbox/deploy'
        elif data['source'] == "UI":
            deployment_url = f'http://{osb_ip}:{osb_port}/api/ui/devbox/deploy'
        else:
            return jsonify({"error": "source value is incorrect"}), 400
        deployment_response = requests.post(deployment_url, json=data)
        if deployment_response.status_code == 200:
            # Prepare the data for insertion into the database, execute the insertion query and commits the transaction. It returns a JSON response containing the request ID (req_id) if the operation is successful
            deployment_response_data = deployment_response.json()
            conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            transaction_id = generate_random_string(4)+"-"+generate_random_string(4)+"-"+timestamp+"-"+generate_random_string(4)
            service_name = "DevBox"
            service_action = "CREATE"
            running_status = "running"
            created_by = data['lan_id']
            payload = "" if data['source'] == "API" else json.dumps(data)
            date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            deployment_id = deployment_response_data['deployment_id']
            deployment_name = deployment_response_data['deployment_name']
            source = data['source']
            deploy_status = json.dumps({})
            deploy_status_history = json.dumps([])
            childrens = [
                            {
                                "key": 0,
                                "date": date_time,
                                "tool_integration": "Aria Automation",
                                "status": "Running",
                                "transaction_id" : transaction_id,
                                "incident": "INC"+str(random.randint(2000, 999999999)),
                                "no_of_retry": 0
                            },
                            {
                                "key": 1,
                                "date": date_time,
                                "tool_integration": "Puppet",
                                "status": "Running",
                                "transaction_id" : transaction_id,
                                "incident": "INC"+str(random.randint(2000, 999999999)),
                                "no_of_retry": 0
                            }
                        ]
            childrens = json.dumps(childrens)
            insert_data = ("", transaction_id, service_name, service_action, running_status, created_by, payload, date_time, deployment_id, deployment_name, source, deploy_status, deploy_status_history, childrens)
            if conn and cursor:
                query = """
                            INSERT INTO services (
                            request_id, 
                            transaction_id, 
                            service_name, 
                            service_action, 
                            running_status, 
                            created_by, 
                            payload, 
                            date_time, 
                            deployment_id, 
                            deployment_name, 
                            source, 
                            deploy_status, 
                            deploy_status_history, 
                            childrens)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """
                
                # Execute SQL query
                execute_query_insert(cursor, conn, query, insert_data)
                #conn.commit()
                # Close connection
                close_connection(conn, cursor)
            response_data = {'message': 'Message received from RabbitMQ'}
            return jsonify(response_data), 200
        else:
            return jsonify({'message': 'No messages in the queue'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

##### Connection to MS SQL Database is established #####
def connect_to_sql_server(server, database, db_username, db_password, db_port):
    try:
        # Establish connection to SQL Server
        conn = pymssql.connect(server=server, user=db_username, password=db_password, database=database, port=db_port)
        # Create a cursor object
        cursor = conn.cursor()
        return conn, cursor
    except Exception as e:
        return None, None, f"Error connecting to SQL Server: {e}"

##### Execute Select Query and retrieve all the rows and column names #####
def execute_query_select(cursor, query):
    try:
        # Execute SELECT SQL query
        cursor.execute(query)
        # Retrive the column names from description and stores it in list 'column_names'
        column_names = [column[0] for column in cursor.description]
        # Fetch all the rows returned by the query
        rows = cursor.fetchall()
        return rows, column_names
    except Exception as e:
        return None, f"Error executing query: {e}"

##### Execute Insert Query. Retrieve the last inserted ID. Generate a Request ID and update it to Table #####
def execute_query_insert(cursor, conn, query, data):
    try:
        # Execute INSERT SQL query
        cursor.execute(query, data)
        conn.commit()
        # Retrieve the last inserted ID
        query_last_inserted_id = '''SELECT IDENT_CURRENT('Services') AS LastInsertedID;'''
        cursor.execute(query_last_inserted_id)
        # Fetch only 1st row of the result
        one_record = cursor.fetchone()
        last_record_id = int(one_record[0])
        # Generate Request ID 
        req_id = req_number + last_record_id
        req_id = "REQ" + str(req_id)
        # Update Row where ID matches last inserted ID with the generated Request ID
        query = f"UPDATE Services SET request_id='{req_id}' WHERE id='{last_record_id}'"
        cursor.execute(query)
        conn.commit()
        return req_id
    except Exception as e:
        return None, f"Error executing query: {e}"

##### Execute Update Query #####
def execute_query_update(cursor, conn, query):
    try:
        cursor.execute(query)
        conn.commit()
        return True
    except Exception as e:
        return None, f"Error executing query: {e}"

##### Close MS SQL Database Connection #####
def close_connection(conn, cursor):
    try:
        # Close cursor and connection
        cursor.close()
        conn.close()
        return None 
    except Exception as e:
        return f"Error closing connection: {e}"

##### API call to initiate the Aria Automation from either UI / REST ##### 
##### Handles requests to create a devbox. Process the request data, validates it, performs the deployment and insert data into the database with the deployment details #####
@app.route('/api/devbox/create', methods=['POST'])
def devbox_create():
    try:
        data = request.get_json()
        # Based on the source, the devbox deployment URL is called. 
        if data['source'] == "API":
            deployment_url = f'http://{osb_ip}:{osb_port}/api/devbox/deploy'
        elif data['source'] == "UI":
            deployment_url = f'http://{osb_ip}:{osb_port}/api/ui/devbox/deploy'
        else:
            return jsonify({"error": "source value is incorrect"}), 400
        deployment_response = requests.post(deployment_url, json=data)
        if deployment_response.status_code == 200:
            # Prepare the data for insertion into the database, execute the insertion query and commits the transaction. It returns a JSON response containing the request ID (req_id) if the operation is successful
            deployment_response_data = deployment_response.json()
            conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
            timestamp = datetime.now().strftime("%Y%m%d%H%M%S")
            transaction_id = generate_random_string(4) + "-" + generate_random_string(
                4) + "-" + timestamp + "-" + generate_random_string(4)
            service_name = "DevBox"
            service_action = "CREATE"
            running_status = "running"
            created_by = data['lan_id']
            payload = "" if data['source'] == "API" else json.dumps(data)
            date_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
            deployment_id = deployment_response_data['deployment_id']
            deployment_name = deployment_response_data['deployment_name']
            source = data['source']
            deploy_status = json.dumps({})
            deploy_status_history = json.dumps([])
            childrens = [
                {
                    "key": 0,
                    "date": date_time,
                    "tool_integration": "Aria Automation",
                    "status": "Running",
                    "transaction_id": transaction_id,
                    "incident": "INC" + str(random.randint(2000, 999999999)),
                    "no_of_retry": 0
                },
                {
                    "key": 1,
                    "date": date_time,
                    "tool_integration": "Puppet",
                    "status": "Running",
                    "transaction_id": transaction_id,
                    "incident": "INC" + str(random.randint(2000, 999999999)),
                    "no_of_retry": 0
                }
            ]
            childrens = json.dumps(childrens)
            insert_data = (
                "", transaction_id, service_name, service_action, running_status, created_by, payload, date_time,
                deployment_id, deployment_name, source, deploy_status, deploy_status_history, childrens)
            if conn and cursor:
                query = """
                            INSERT INTO services (
                            request_id,
                            transaction_id,
                            service_name,
                            service_action,
                            running_status,
                            created_by,
                            payload,
                            date_time,
                            deployment_id,
                            deployment_name,
                            source,
                            deploy_status,
                            deploy_status_history,
                            childrens)
                            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        """

                # Execute SQL query
                req_id = execute_query_insert(cursor, conn, query, insert_data)
                # conn.commit()
                # Close connection
                close_connection(conn, cursor)
            response_data = {'req_id': req_id}
            return jsonify(response_data), 201
        elif deployment_response.status_code == 401:
            return jsonify({'error': 'Unauthorized access'}), 401
        else:
            return jsonify({'error': deployment_response.text}), deployment_response.status_code
    except Exception as e:
        return jsonify({'error': str(e)}), 500

##### Initiate the Aria automation from UI #####
@app.route('/api/ui/devbox/deploy', methods=['POST'])
def deploy_ui():
    url = f"{osb_api}/deploy"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        request_data = request.get_json()
        response = requests.post(url, json=request_data, headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 200
    except requests.RequestException as e:
        return e

##### Initiate the Aria automation from REST API #####
@app.route('/api/devbox/deploy', methods=['POST'])
def deploy_postman():
    try:
        data = request.get_json()
        lan_id = data.get('lan_id')
        lan_password = data.get('lan_password')

        # Call the validate-user endpoint for LDAP validation
        validation_url = f'http://{osb_ip}:{osb_port}/api/ldap/validate-user'
        validation_response = requests.post(validation_url, json={'username': lan_id, 'password': lan_password})

        if validation_response.status_code == 200:
            # User authentication successful, proceed with devbox creation
            url = f"{osb_api}/deploy"
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }

            response = requests.post(url, json=data, headers=headers, verify=False)
            response_json = response.json()
            return jsonify(response_json), 200
        else:
            # User authentication failed, return the validation response
            return validation_response.json(), validation_response.status_code
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500
    
##### The function will either Retreive all the Transaction data OR Retreive the Transaction data based on username from the Database
@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    username = request.args.get('username')
    try:
        conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
        if not username:
            query = f'''SELECT * FROM Services  ORDER BY id DESC'''
        else:
            query = f'''SELECT * FROM Services WHERE created_by = '{username}' ORDER BY id DESC'''
        response_json, column_names = execute_query_select(cursor, query)
        result = [{key: value for key, value in zip(column_names, data)} for data in response_json]
        return jsonify(result), 200
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

##### Retreive and Update the 'childrens' & 'running_status' based on specific 'id'. We use it for RESET & ROLLBACK logic #####
@app.route('/api/transactions/<id>', methods=['PUT'])
def put_transactions(id):
    try:
        request_data = request.get_json()
        payload = request_data['data']
        childrens = payload['childrens']
        running_status = payload['running_status']
        conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
        query = f"UPDATE Services SET [running_status]='{running_status}',[childrens] = '{childrens}' WHERE [id] = {id}"
        execute_query_update(cursor, conn, query)
        return jsonify({}), 201
    except requests.RequestException as e:
        return jsonify({'error': str(e)}), 500

##### The function updates the transaction status by fetching deployment status data, processing it, and updating the database accordingly #####
@app.route('/api/update_transactions', methods=['GET'])
def update_transactions():
    try:
        conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
        # Define SQL query to fetch services with running status
        query = f'''SELECT * FROM Services WHERE running_status = 'running' ORDER BY id DESC'''
        response_json, column_names = execute_query_select(cursor, query)
        result = [{key: value for key, value in zip(column_names, data)} for data in response_json]
        for i in result:
            url = f"{osb_api}/update_transactions?deployment_id={i['deployment_id']}"
            headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
            # Send GET request to update transactions
            response = requests.get(url, json={}, headers=headers, verify=False)
            deploy_response_json = response.json()
            # Extract deploy status data
            deploy_status_data = deploy_response_json["deploy_status_data"]
            running_status = "running"
            # Determine the running status based on deploy status
            if deploy_status_data["status"] == "CREATE_FAILED":
                running_status = "failed"
            elif deploy_status_data["status"] == "CREATE_SUCCESSFUL":
                running_status = "completed"
            # Convert deploy status and history data to JSON format
            deploy_status = json.dumps(deploy_status_data)
            deploy_history_data = deploy_response_json['deploy_status_history']
            
            # Update deploy status history based on resource types
            if len(deploy_history_data) > 0:
                resourceType = [
                    {"resourceType": "Cloud.Puppet", "error": 0, "completed": 0, "running": 0},
                    {
                        "resourceType": "Cloud.vSphere.Machine",
                        "error": 0,
                        "completed": 0,
                        "running": 0,
                    },
                    {"resourceType": "Cloud.Network", "error": 0, "completed": 0, "running": 0},
                    {"resourceType": "Cloud.Volume", "error": 0, "completed": 0, "running": 0},
                ]
                request_failed = 0
                for deploy_histories in deploy_history_data:
                    for resource_type in resourceType:
                        if deploy_histories["resourceType"]:
                            if deploy_histories["resourceType"] == resource_type["resourceType"]:
                                if deploy_histories["name"] == "CREATE_FAILED":
                                    resource_type["error"] = int(resource_type["error"]) + 1
                                elif deploy_histories["name"] == "REQUEST_FAILED" or deploy_histories["name"] == "ALLOCATE_FAILED":
                                    request_failed = 1
                                    resource_type["error"] = int(resource_type["error"]) + 1
                                elif deploy_histories["name"] == "CREATE_FINISHED":
                                    resource_type["completed"] = int(resource_type["completed"]) + 1
                                elif deploy_histories["name"] == "CREATE_IN_PROGRESS":
                                    resource_type["running"] = int(resource_type["running"]) + 1
                # Update children status based on resource types
                childrens = json.loads(i["childrens"])
                err = 0
                comp = 0
                run = 0
                for resource_type in resourceType:
                    if 'Puppet' in resource_type["resourceType"]:
                        if resource_type["error"] > 0 or request_failed > 0:
                            childrens[1]["status"] = "Failed"
                        elif resource_type["completed"] > 0 and resource_type["error"] == 0:
                            childrens[1]["status"] = "Completed"
                        elif resource_type["running"] > 0 and resource_type["completed"] == 0 and resource_type[
                            "error"] == 0:
                            childrens[1]["status"] = "Running"
                    else:
                        if (resource_type["error"] > 0 and err == 0) or request_failed > 0:
                            childrens[0]["status"] = "Failed"
                            err += 1
                        elif resource_type["completed"] > 0 and resource_type["error"] == 0 and err == 0 and comp == 0:
                            childrens[0]["status"] = "Completed"
                            comp += 1
                        elif resource_type["running"] > 0 and resource_type["completed"] == 0 and resource_type[
                            "error"] == 0 and err == 0 and comp == 0 and run == 0:
                            childrens[0]["status"] = "Running"
                            run += 1
                # Update children status based on request status
                if request_failed == 0 and resourceType[0]["error"] == 0 and resourceType[0]["completed"] == 0 and \
                        resourceType[0]["running"] == 0:
                    childrens[0]["status"] = "Running"

                childrens_updated = json.dumps(childrens)
                deploy_status_history = json.dumps(deploy_history_data).replace("'", "")
                update_id = i["id"]
                # Update running_status, childrens, deploy_status, deploy_history_status details in Database
                query = f"UPDATE Services SET [running_status]='{running_status}',[childrens] = '{childrens_updated}', [deploy_status] = '{deploy_status}', [deploy_status_history] = '{deploy_status_history}' WHERE [id] = {update_id}"
                execute_query_update(cursor, conn, query)
        return jsonify({}), 200
    except requests.RequestException as e:
        return e


##### LDAP User authentication in User Base DN #####
@app.route('/api/ldap/validate-user', methods=['POST'])
def validate_user():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    ldap_url = 'ldaps://lb.au.cbainet.com'

    try:
        # Define LDAP server
        server = Server(ldap_url, port=636, use_ssl=True)

        # Define LDAP connection
        conn = Connection(server, user="CN={},OU=EUC Accounts,DC=au,DC=cbainet,DC=com".format(username),
                          authentication=SIMPLE, password=password)
        conn.open()  # Open the connection
        if conn.bind():
            # User authenticated successfully, now search for user
            conn.search(search_base='dc=au,dc=cbainet,dc=com',
                        search_filter='(sAMAccountName={})'.format(username))
            if len(conn.entries) == 1:
                return jsonify({'message': 'User ID exists in LDAP.'}), 200
            else:
                return jsonify({'message': 'User ID does not exist in LDAP or authentication failed.'}), 401
        else:
            return jsonify({'message': 'LDAP bind failed'}), 401
    except Exception as e:
        return jsonify({'message': f'LDAP connection error: {e}'}), 500
    finally:
        conn.unbind()  # Close the connection

###### LDAP User authentication in Group Base DN #####
@app.route('/api/ldap/validate-user-group', methods=['POST'])
def validate_user_group():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    ldap_url = 'ldaps://lb.au.cbainet.com'
    user_dn = f"CN={username},OU=EUC Accounts,DC=au,DC=cbainet,DC=com"

    try:
        # Define LDAP server
        server = Server(ldap_url, port=636, use_ssl=True)

        # Define LDAP connection
        conn = Connection(server, user=f"CN={username},OU=EUC Accounts,DC=au,DC=cbainet,DC=com",
                          authentication=SIMPLE, password=password)

        conn.open()  # Open the connection

        if conn.bind():
            # User authenticated successfully, now search for the group entry
            conn.search(search_base=group_dn,
                        search_filter=f'(&(objectClass=group)(member={user_dn}))',
                        search_scope=SUBTREE,
                        attributes=['cn', 'memberOf'])

            if len(conn.entries) == 1:
                return jsonify({'message': 'User is a member of the group.'}), 200
            else:
                return jsonify({'message': 'User is not a member of the group.'}), 401
        else:
            return jsonify({'message': 'LDAP bind failed'}), 401
    except Exception as e:
        return jsonify({'message': f'LDAP connection error: {e}'}), 500
    finally:
        conn.unbind()  # Close the connection


if __name__ == '__main__':
    app.run(host=osb_ip, port=osb_port, debug=True)
