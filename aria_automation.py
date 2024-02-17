from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

def get_refresh_token():
    url = "https://vmpautomation-dev.stg.nonprod.vmware.cba/csp/gateway/am/api/login?access_token="
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    data = {
        "username": "gutturra",
        "password": "G$Gbz3TNAzLN-b"
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
        return None

def get_bearer_token(refresh_token):
    url = "https://vmpautomation-dev.stg.nonprod.vmware.cba/iaas/api/login"
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

def deploy_resource(bearer_token):
    url = "https://vmpautomation-dev.stg.nonprod.vmware.cba/catalog/api/items/4c31e0fc-02f9-354d-b4c7-088ea2d0bfad/request"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': f'Bearer {bearer_token}'
    }
    data = {
        "projectId": "0d5d4d40-53f6-44df-963a-3593955dbd0c",
        "inputs": {
            "vCPU": 4,
            "ramGb": 4
        }
    }
    try:
        response = requests.post(url, json=data, headers=headers, verify=False)
        response.raise_for_status()
        return True
    except requests.RequestException as e:
        return False

@app.route('/api/deploy', methods=['POST'])
def deploy():
    data = {}
    refresh_token = get_refresh_token()
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
            success = deploy_resource(bearer_token)
            if success:
                return jsonify({'message': 'Resource Deployment Successful'}), 200
            else:
                return jsonify({'error': 'Resource Deployment Failed'}), 500
        else:
            return jsonify({'error': 'Bearer Token not obtained'}), 500
    else:
        return jsonify({'error': 'Refresh Token not obtained'}), 500


if __name__ == '__main__':
    app.run(host='10.45.197.28', port=8443, debug=True)
    
