from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from ldap3 import Server, Connection, SIMPLE, ALL, SUBTREE
import requests
import json
import sys
import pika
import pymssql
import random
import string
from datetime import datetime
import base64

app = Flask(__name__)

cors = CORS(app)

def read_index_json():
    file_path = "/apps/aria_automation/index.json"
    try:
        with open(file_path, 'r') as file:
            index_data = json.load(file)
            return index_data
    except FileNotFoundError:
        print(f"File '{file_path}' not found.")
        return None
    except json.JSONDecodeError as e:
        print(f"Error decoding JSON: {e}")
        return None

index_data = read_index_json()
osb_api = index_data.get('osb_api')
osb_ip = index_data.get('osb_ip')
osb_port = index_data.get('osb_port')
group_dn = index_data.get('group_base_dn')
server = index_data.get('server')
database = index_data.get('database')
db_port = index_data.get('db_port')
req_number = index_data.get('req_number')


def read_db_creds():
    creds_file_path = "/apps/aria_automation/db_credentials.txt"
    try:
        with open(creds_file_path, 'r') as t:
            lines = t.readlines()
            db_username = base64.b64decode(lines[0].strip()).decode('utf-8')
            db_password = base64.b64decode(lines[1].strip()).decode('utf-8')
            return db_username, db_password
    except FileNotFoundError:
        return None, None


db_username, db_password = read_db_creds()


def generate_random_string(length):
    # Define the characters to choose from
    characters = string.ascii_letters + string.digits  # You can add more characters if needed

    # Generate the random string
    random_string = ''.join(random.choice(characters) for _ in range(length))

    return random_string


##################### DATABASE #######################
def connect_to_sql_server(server, database, db_username, db_password, db_port):
    try:
        # Establish connection to SQL Server
        conn = pymssql.connect(server=server, user=db_username, password=db_password, database=database, port=db_port)

        # Create a cursor object
        cursor = conn.cursor()

        print("Connection to SQL Server successful!")

        return conn, cursor


    except Exception as e:
        print(f"Error connecting to SQL Server: {e}")
        return None, None


def execute_query_select(cursor, query):
    try:
        # Execute SQL query
        cursor.execute(query)
        column_names = [column[0] for column in cursor.description]
        # Fetch all the rows returned by the query
        rows = cursor.fetchall()
        row_count = cursor.rowcount

        return rows, column_names

    except Exception as e:
        print(f"Error executing query: {e}")
        return None


def execute_query_insert(cursor, conn, query, data):
    try:
        # Execute SQL query
        cursor.execute(query, data)
        conn.commit()
        query_last_inserted_id = '''SELECT IDENT_CURRENT('Services') AS LastInsertedID;'''
        cursor.execute(query_last_inserted_id)

        # Fetch only one record
        one_record = cursor.fetchone()
        print("ONE_RECORD_OF", one_record[0])
        print("ONE_RECORD", one_record)
        last_record_id = int(one_record[0])
        req_id = req_number + last_record_id
        req_id = "REQ" + str(req_id)
        print("REQ_ID", req_id)
        query = f"UPDATE Services SET request_id='{req_id}' WHERE id='{last_record_id}'"
        print("UPDATE_QUERY", query)
        # update_data = (req_id, last_record_id)
        cursor.execute(query)
        conn.commit()
        return req_id

    except Exception as e:
        print(f"Error executing query: {e}")
        return None


def execute_query_update(cursor, conn, query):
    try:
        cursor.execute(query)
        conn.commit()
        return True

    except Exception as e:
        print(f"Error executing query: {e}")
        return None


def close_connection(conn, cursor):
    try:
        # Close cursor and connection
        cursor.close()
        conn.close()
        print("Connection closed.")

    except Exception as e:
        print(f"Error closing connection: {e}")

@app.route('/api/devbox/create', methods=['POST'])
def devbox_create():
    try:
        data = request.get_json()
        if data['source'] == "API":
            deployment_url = f'http://{osb_ip}:{osb_port}/api/devbox/deploy'
        elif data['source'] == "UI":
            deployment_url = f'http://{osb_ip}:{osb_port}/api/ui/devbox/deploy'
        else:
            return jsonify({"error": "source value is incorrect"}), 400
        deployment_response = requests.post(deployment_url, json=data)
        if deployment_response.status_code == 200:
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

#### POSTMAN ######
@app.route('/api/devbox/deploy', methods=['POST'])
def deploy_postman():
    try:
        data = request.get_json()
        lan_id = data.get('lan_id')
        lan_password = data.get('lan_password')
        source = data.get('source')

        # Call the validate-user endpoint to validate the user's credentials
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
        return str(e), 500

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    username = request.args.get('username')
    # if not username:
    #     return jsonify({'error': 'Username parameter is required'}), 400
    url = f"{osb_api}/transactions"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
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

@app.route('/api/transactions/<id>', methods=['PUT'])
def put_transactions(id):
    url = f"{osb_api}/transactions_post"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        request_data = request.get_json()
        payload = request_data['data']
        childrens = payload['childrens']
        running_status = payload['running_status']
        conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
        query = f"UPDATE Services SET [running_status]='{running_status}',[childrens] = '{childrens}' WHERE [id] = {id}"
        execute_query_update(cursor, conn, query)
        # response = requests.post(url, json=request_data, headers=headers, verify=False)
        # response_json = response.json()
        return jsonify({}), 201
    except requests.RequestException as e:
        return e

@app.route('/api/update_transactions', methods=['GET'])
def update_transactions():
    try:
        url = f"{osb_api}/update_transactions?deployment_id=[]"
        headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        conn, cursor = connect_to_sql_server(server, database, db_username, db_password, db_port)
        query = f'''SELECT * FROM Services WHERE running_status = 'running' ORDER BY id DESC'''
        response_json, column_names = execute_query_select(cursor, query)
        result = [{key: value for key, value in zip(column_names, data)} for data in response_json]
        for i in result:
            url = url.replace("[]", i["deployment_id"])
            response = requests.get(url, json={}, headers=headers, verify=False)
            deploy_response_json = response.json()
            deploy_status_data = deploy_response_json["deploy_status_data"]
            data = []
            running_status = "running"
            if deploy_status_data["status"] == "CREATE_FAILED":
                running_status = "failed"
            elif deploy_status_data["status"] == "CREATE_SUCCESSFUL":
                running_status = "completed"

            deploy_status = json.dumps(deploy_status_data)

            deploy_history_data = deploy_response_json['deploy_status_history']

            if len(deploy_history_data) > 0:
                # data["deploy_status_history"] = deploy_history_data
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
                # print(deploy_history_data)
                request_failed = 0
                for deploy_histories in deploy_history_data:
                    for resource_type in resourceType:
                        if deploy_histories["resourceType"]:
                            if deploy_histories["resourceType"] == resource_type["resourceType"]:
                                if deploy_histories["name"] == "CREATE_FAILED":
                                    resource_type["error"] = int(resource_type["error"]) + 1
                                elif deploy_histories["name"] == "REQUEST_FAILED" or deploy_histories[
                                    "name"] == "ALLOCATE_FAILED":
                                    request_failed = 1
                                    resource_type["error"] = int(resource_type["error"]) + 1
                                elif deploy_histories["name"] == "CREATE_FINISHED":
                                    resource_type["completed"] = int(resource_type["completed"]) + 1
                                elif deploy_histories["name"] == "CREATE_IN_PROGRESS":
                                    resource_type["running"] = int(resource_type["running"]) + 1

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

                if request_failed == 0 and resourceType[0]["error"] == 0 and resourceType[0]["completed"] == 0 and \
                        resourceType[0]["running"] == 0:
                    childrens[0]["status"] = "Running"

                childrens_updated = json.dumps(childrens)
                deploy_status_history = json.dumps(deploy_history_data).replace("'", "")
                update_id = i["id"]
                # query =  f"UPDATE Services SET running_status='{running_status}', childrens='{childrens_updated}', deploy_status='{deploy_status}',  deploy_status_history='{deploy_status_history}' WHERE id='{update_id}';"
                query = f"UPDATE Services SET [running_status]='{running_status}',[childrens] = '{childrens_updated}', [deploy_status] = '{deploy_status}', [deploy_status_history] = '{deploy_status_history}' WHERE [id] = {update_id}"
                execute_query_update(cursor, conn, query)
            # return jsonify(response_json), 200

        return jsonify({}), 200
    except requests.RequestException as e:
        return e


## LDAP User authentication in User Base DN
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
    
