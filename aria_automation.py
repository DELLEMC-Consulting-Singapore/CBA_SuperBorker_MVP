from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import json
import sys

app = Flask(__name__)

cors = CORS(app)

deploymentID = "33eca87f-7a0a-4671-8b3d-a7c458a60564"

def read_transactions():
    with open('transactions.json', 'r') as file:
        data = json.load(file)
    return data

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
        print(e)
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
        response_json = response.json()
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
    url = f"https://vmpautomation-dev.stg.nonprod.vmware.cba/deployment/api/deployments/{deploymentID}?expand=resources"
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
    url = f"https://vmpautomation-dev.stg.nonprod.vmware.cba/deployment/api/deployments/{deploymentID}/requests?size=100&apiVersion=2020-08-25"
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
    url = f"https://vmpautomation-dev.stg.nonprod.vmware.cba/deployment/api/deployments/{deploymentID}/requests/{request_id_data}/events?page=0&size=50&apiVersion=2020-08-25"
    #print(url)
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
    refresh_token = get_refresh_token()
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
            deployment_id, deployment_name = deploy_resource(bearer_token)
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

@app.route('/api/deploy_status', methods=['GET'])
def get_deploy_status():
    deploymentID = request.args.get("deploymentId")
    #print("REQUEST DATA", request_data)
    #sys.exit(0)
    refresh_token = get_refresh_token()
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
           response_json = deploy_status(deploymentID, bearer_token)
           if response_json:
                # Return the raw JSON response from the external API call
                return jsonify(response_json), 200
           else:
                return jsonify({'error': 'Failed to retrieve deployment status'}), 500
        else:
            return jsonify({'error': 'Bearer Token not obtained'}), 500
    else:
        return jsonify({'error': 'Refresh Token not obtained'}), 500

@app.route('/api/deploy_history_status', methods=['GET'])
def get_deploy_history():
    deploymentID = request.args.get("deploymentId")
    refresh_token = get_refresh_token()
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
           request_id_data = request_id(deploymentID, bearer_token)
           if request_id_data:
                response_json = deploy_history(request_id_data, deploymentID, bearer_token)
                if response_json:
                   return jsonify(response_json), 200
                else:
                   return jsonify({'error': 'Failed to retrieve deployment History status'}), 500
           else:
                return jsonify({'error': 'Failed to retrieve the Request ID'}), 500
        else:
            return jsonify({'error': 'Bearer Token not obtained'}), 500
    else:
        return jsonify({'error': 'Refresh Token not obtained'}), 500


@app.route('/api/transactions', methods=['GET'])
def get_transactions():
    data = read_transactions()
    if data:
        return jsonify(data), 200
    else:
        return jsonify({'error': 'No data found'}), 500

@app.route('/api/transactions', methods=['POST'])
def post_transactions():
    request_data = request.get_json()
    payload = request_data['data']
    trans = read_transactions()
    len_trans = len(trans) + 1
#    payload = "[{\"request_id\":\"REQ2324\",\"transaction_id\":\"7479-aKmr-1708409110630-8cRb\",\"service_name\":\"DevBox\",\"date_time\":\"01-31-202$
    payload_data = json.loads(payload)
    payload_data[0]['key'] = len_trans
    trans.append(payload_data[0])
    with open("transactions.json", "w") as outfile:
       json.dump(trans, outfile)
    return jsonify({}), 201

def map_data(old_data, new_data):
    print(new_data)

@app.route('/api/transactions_post', methods=['POST'])
def put_transactions():
    request_data = request.get_json()
    payload = json.loads(request_data['data'])
    trans = read_transactions()
    #print(payload)
    #transaction_data = map(map_data,trans,payload)
    #sys.exit(0)
    newdata = []
    for data in trans:
       #print(data)
       if data["key"]== payload["key"]:
          newdata.append(payload)
       else:
          newdata.append(data)
    #print(newdata)
#    payload = "[{\"request_id\":\"REQ2324\",\"transaction_id\":\"7479-aKmr-1708409110630-8cRb\",\"service_name\":\"DevBox\",\"date_time\":\"01-31-20$
    #payload_data = json.loads(payload)
    #payload_data[0]['key'] = len_trans
    #trans.append(payload_data[0])
    with open("transactions.json", "w") as outfile:
       json.dump(newdata, outfile)
    return jsonify({}), 201

@app.route('/api/update_transactions', methods=['GET'])
def update_transactions():
    trans = read_transactions()
    refresh_token = get_refresh_token()
    new_data = []
    if refresh_token:
        bearer_token = get_bearer_token(refresh_token)
        if bearer_token:
            for data in trans:
                if data['request_status'] == "running":
                    deploymentID = data['deployment_id']
                    deploy_status_data = deploy_status(deploymentID, bearer_token)
                    # Return the raw JSON response from the external API call
                    if deploy_status_data:                            
                        data['deploy_status'] = deploy_status_data        

                        if deploy_status_data["status"] == "CREATE_FAILED": 
                            data["request_status"] = "failed"
                            data["request_status1"] = "failed"
                        elif deploy_status_data["status"] == "CREATE_SUCCESSFUL":
                            data["request_status"] = "completed"
                            data["request_status1"] = "completed"
                        
                        data["created_by"] = deploy_status_data["createdBy"]
                        

                    #deploy_status_history
                    request_id_data = request_id(deploymentID, bearer_token)
                    if request_id_data:
                        deploy_history_data = deploy_history(request_id_data, deploymentID, bearer_token)
                        data['deploy_status_history'] = deploy_history_data

                        resourceType = [
                            { "resourceType": "Cloud.Puppet", "error": 0, "completed": 0, "running": 0 },
                            {
                            "resourceType": "Cloud.vSphere.Machine",
                            "error": 0,
                            "completed": 0,
                            "running": 0,
                            },
                            { "resourceType": "Cloud.Network", "error": 0, "completed": 0, "running": 0 },
                            { "resourceType": "Cloud.Volume", "error": 0, "completed": 0, "running": 0 },
                        ]    

                        for deploy_histories in deploy_history_data:
                            for resource_type in resourceType:
                                if deploy_histories["resourceType"] != "":
                                    if deploy_histories["resourceType"] == resource_type["resourceType"]:
                                        if deploy_histories["name"] == "CREATE_FAILED":
                                            resource_type["error"] = int(resource_type["error"]) + 1
                                        elif deploy_histories["name"] == "CREATE_FINISHED":
                                            resource_type["completed"] = int(resource_type["completed"]) + 1
                                        elif deploy_histories["name"] == "CREATE_IN_PROGRESS":
                                            resource_type["running"] = int(resource_type["running"]) + 1

                        
                        err = 0
                        comp = 0
                        run = 0
                        for resource_type in resourceType:
                            if 'Puppet' in resource_type["resourceType"]:
                                if resource_type["error"] > 0:
                                    data["childrens"][1]["status"] = "Failed"
                                elif resource_type["completed"] > 0 and resource_type["error"] == 0:
                                    data["childrens"][1]["status"] = "Completed"
                                elif resource_type["running"] > 0 and resource_type["completed"] == 0 and resource_type["error"] == 0:
                                    data["childrens"][1]["status"] = "Running"
                            else:
                                if resource_type["error"] > 0 and err == 0:
                                    data["childrens"][0]["status"] = "Failed"
                                    err+=1
                                elif resource_type["completed"] > 0 and resource_type["error"] == 0 and err == 0 and comp == 0:
                                    data["childrens"][0]["status"] = "Completed"
                                    comp+=1
                                elif resource_type["running"] > 0 and resource_type["completed"] == 0 and resource_type["error"] == 0 and err == 0 and comp == 0 and run == 0:
                                    data["childrens"][0]["status"] = "Running"
                                    run+=1

                        if resourceType[0]["error"] == 0 and resourceType[0]["completed"] == 0 and resourceType[0]["running"] == 0:
                            data["childrens"][0]["status"] = "Running"                          
                    new_data.append(data)
                else:
                    new_data.append(data)           
            with open("transactions.json", "w") as outfile:
                json.dump(new_data, outfile)
            read_transactions_data = read_transactions()
            if read_transactions_data:
                return jsonify(read_transactions_data), 200
            else:
                return jsonify({'error': 'No data found'}), 500
        else:
            return jsonify({'error': 'Bearer Token not obtained'}), 500
    else:
        return jsonify({'error': 'Refresh Token not obtained'}), 500


if __name__ == '__main__':
    app.run(host='10.45.197.28', port=8443, debug=True)
    
