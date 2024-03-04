from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from ldap3 import Server, Connection, SIMPLE, ALL, SUBTREE
import requests
import json
import sys

app = Flask(__name__)

cors = CORS(app)

group_dn = "CN=SGG_CBA_ED_DAAS_USERS,OU=DaaS,OU=Applications,OU=Groups,DC=au,DC=cbainet,DC=com"

###### UI ############
@app.route('/api/ui/devbox/create', methods=['POST'])
def deploy_ui():
    url = "http://10.45.197.28:8443/api/deploy"
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

#### POSTMAN ######
@app.route('/api/devbox/create', methods=['POST'])
def deploy_postman():
    try:
        data = request.get_json()
       # username = data.get('username')
       # password = data.get('password')
        lan_id = data.get('lan_id')
        lan_password = data.get('lan_password')
        source = data.get('source')

        # Call the validate-user endpoint to validate the user's credentials
        validation_response = requests.post('http://10.45.197.10:5000/api/ldap/validate-user',
                                            json={'username': lan_id, 'password': lan_password})

        if validation_response.status_code == 200:
            # User authentication successful, proceed with devbox creation
            url = "http://10.45.197.28:8443/api/deploy"
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

@app.route('/api/deploy_history_status', methods=['GET'])
def get_deploy_history_status():
    deploymentID = request.args.get("deploymentId")
    url = "http://10.45.197.28:8443/api/deploy_history_status?deploymentId="+deploymentID
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        response = requests.get(url,headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json["content"]), 200
    except requests.RequestException as e:
        return e

@app.route('/api/deploy_status', methods=['GET'])
def get_deploy_status():
    deploymentID = request.args.get("deploymentId")
    url = "http://10.45.197.28:8443/api/deploy_status?deploymentId="+deploymentID
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        response = requests.get(url,headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 200
    except requests.RequestException as e:
        return e

@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    url = "http://10.45.197.28:8443/api/transactions"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        response = requests.get(url,headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 200
    except requests.RequestException as e:
        return e

@app.route('/api/transactions', methods=['POST'])
def post_transactions():
    url = "http://10.45.197.28:8443/api/transactions"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        request_data = request.get_json()
        payload = request_data['data']
        response = requests.post(url, json=request_data, headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 201
    except requests.RequestException as e:
        return e

@app.route('/api/transactions_post', methods=['POST'])
def put_transactions():
    url = "http://10.45.197.28:8443/api/transactions_post"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        request_data = request.get_json()
        payload = request_data['data']
        response = requests.post(url, json=request_data, headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 201
    except requests.RequestException as e:
        return e

@app.route('/api/update_transactions', methods=['GET'])
def update_transactions():
    url = "http://10.45.197.28:8443/api/update_transactions"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    try:
        response = requests.get(url, json={}, headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 200
    except requests.RequestException as e:
        return e

## LDAP User authentication in User Base DN
@app.route('/api/ldap/validate-user', methods=['POST'])
def validate_user():
    data = request.get_json()
    print(data)
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
    app.run(host='10.45.197.10', port=5000, debug=True)
    
