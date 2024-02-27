from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import requests
import json
import sys

app = Flask(__name__)

cors = CORS(app)

@app.route('/api/deploy', methods=['POST'])
def deploy():
    url = "http://10.45.197.28:8443/api/deploy"
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }
    try:
        request_data = request.get_json()
        response = requests.post(url, json=request_data, headers=headers, verify=False)
        response_json = response.json()
        return jsonify(response_json), 200
    except requests.RequestException as e:
        return e

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


if __name__ == '__main__':
    app.run(host='10.45.197.10', port=5000, debug=True)
  
