from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import json
import sys
import base64

app = Flask(__name__)

cors = CORS(app)

def read_index_json():
    file_path = "/apps/vmware_aria_integration/index.json"
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
aria_api = index_data.get('aria_api')
worker_node_ip = index_data.get('worker_node_ip')
worker_node_port = index_data.get('worker_node_port')

def read_sa_creds():
    creds_file_path = "/apps/vmware_aria_integration/service_account_credentials.txt"
    try:
        with open(creds_file_path, 'r') as t:
            lines = t.readlines()
            sa_username = base64.b64decode(lines[0].strip()).decode('utf-8')
            sa_password = base64.b64decode(lines[1].strip()).decode('utf-8')
            return sa_username, sa_password
    except FileNotFoundError:
        print(f"File '{creds_file_path}' not found.")
        return None, None

sa_username, sa_password = read_sa_creds()

def get_refresh_token(sa_username, sa_password):
    print("USERNAME", sa_username)
    print("PASSWORD", sa_password)
    url = f"{aria_api}/csp/gateway/am/api/login?access_token="
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    data = {
        "username": sa_username,
        "password": sa_password
    }
    try:
        response = requests.post(url, json=data, headers=headers, verify=False)
        response.raise_for_status()
        token_auth = response.json()
        refresh_token = token_auth.get('refresh_token')
        if refresh_token:
            return refresh_token
        else:
            return None
    except requests.RequestException as e:
        print(e)
        return None

def get_bearer_token(refresh_token):
    url = f"{aria_api}/iaas/api/login"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    data = {
        "refreshToken": refresh_token
    }
    try:
        response = requests.post(url, json=data, headers=headers, verify=False)
        response.raise_for_status()
        token_auth = response.json()
        bearer_token = token_auth.get('token')
        if bearer_token:
            return bearer_token
        else:
            return None
    except requests.RequestException as e:
        return None

def deploy_resource(bearer_token, lan_id):
    url = f"{aria_api}/catalog/api/items/4c31e0fc-02f9-354d-b4c7-088ea2d0bfad/request"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {bearer_token}'
    }
    data = {
        "projectId": "0d5d4d40-53f6-44df-963a-3593955dbd0c",
        "inputs": {
            "vCPU": 4,
            "ramGb": 4,
            "username": lan_id
        }
    }
    try:
        response = requests.post(url, json=data, headers=headers, verify=False)
        response_json = response.json()
        print("response", response_json)
        if response_json and isinstance(response_json, list):
            # Access the first element of the list and extract 'deploymentID'
            deployment_id = response_json[0].get('deploymentId')
            deployment_name = response_json[0].get('deploymentName')
            if deployment_id:
                return deployment_id, deployment_name
        # If 'deploymentID' is not found
        return None, None
    except requests.RequestException as e:
        return False

def deploy_status(deploymentID, bearer_token):
    url = f"{aria_api}/deployment/api/deployments/{deploymentID}?expand=resources"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {bearer_token}'
    }
    try:
        response = requests.get(url, headers=headers, verify=False)
        response_json = response.json()
        return response_json
    except requests.RequestException as e:
        return e

def request_id(deploymentID, bearer_token):
    url = f"{aria_api}/deployment/api/deployments/{deploymentID}/requests?size=100&apiVersion=2020-08-25"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {bearer_token}'
    }
    try:
        response = requests.get(url, headers=headers, verify=False)
        response_json = response.json()
       # request_data = json.loads(response_json)
        request_id_data = response_json["content"][0]["id"]
        if request_id_data:
           return request_id_data
        else:
           return None
    except requests.RequestException as e:
        return e

def deploy_history(request_id_data, deploymentID, bearer_token):
    url = f"{aria_api}/deployment/api/deployments/{deploymentID}/requests/{request_id_data}/events?page=0&size=50&apiVersion=2020-08-25"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {bearer_token}'
    }
    try:
        response = requests.get(url, headers=headers, verify=False)
        response_json = response.json()
        return response_json
    except requests.RequestException as e:
        return e

@app.route('/api/deploy', methods=['POST'])
def deploy():
    data = {}
    request_data = request.get_json()
    lan_id = request_data.get('lan_id')
    source = request_data.get('source')
    refresh_token = get_refresh_token(sa_username, sa_password)
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
            deployment_id, deployment_name = deploy_resource(bearer_token, lan_id)
            if deployment_id:
                return jsonify({
                    'message': 'Deployment Successful',
                    'deployment_id': deployment_id,
                    'deployment_name': deployment_name
                }), 200
            else:
                return jsonify({'error': 'Resource Deployment Failed'}), 500
        else:
            return jsonify({'error': 'Bearer Token not obtained'}), 500
    else:
        return jsonify({'error': 'Refresh Token not obtained'}), 500

@app.route('/api/update_transactions', methods=['GET'])
def update_transactions():
    deployment_id = request.args.get('deployment_id')
    refresh_token = get_refresh_token(sa_username, sa_password)
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
            deploymentID = deployment_id
            deploy_status_data = deploy_status(deploymentID, bearer_token)
            #print("DEPLOY_STATUS_DATA",deploy_status_data)
            statusCode = 200
            if 'statusCode' in deploy_status_data:
                statusCode = deploy_status_data['statusCode']
            if statusCode == 200:
                request_id_data = request_id(deploymentID, bearer_token)
                if request_id_data:
                    deploy_history_data = deploy_history(request_id_data, deploymentID, bearer_token)
                    deploy_status_history = deploy_history_data["content"]
                    return jsonify({'deploy_status_data': deploy_status_data, 'deploy_status_history': deploy_status_history}), 200
                else:
                    return jsonify({'deploy_status_data': {}, 'deploy_status_history': []}), 200
            else:
                return jsonify({'deploy_status_data': {}, 'deploy_status_history': []}), 200
        else:
            return jsonify({'error': 'Bearer Token not obtained'}), 500
    else:
        return jsonify({'error': 'Refresh Token not obtained'}), 500


if __name__ == '__main__':
    app.run(host=worker_node_ip, port=worker_node_port, debug=True)
    
