from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/create-vm', methods=['POST'])
def create_vm():
    # Sample test body with a placeholder key-value pair
    request_data = {
        'test': 'test'
    }

    # Generate refresh token
    refresh_token = generate_refresh_token()

    # Generate bearer token using the refresh token
    bearer_token = generate_bearer_token(refresh_token)

    # Deploy VM using bearer token
    deployment = deploy(bearer_token)

    return jsonify({
        "refresh_token": refresh_token,
        "bearer_token": bearer_token,
        "deployment": deployment
    })

def generate_refresh_token(username, password):
    try:
        # Data to be sent in the request body
        data = {
            "username": "test",
            "password": "pass"
        }
        # Make a POST request to the external endpoint to fetch the refresh token
        response = requests.post("https://ip/access_token", json=data, verify=False)
        response.raise_for_status()  # Raise an exception for HTTP errors (status code 4xx or 5xx)
        data = response.json()
        return data.get("refresh_token")  # refresh token is returned as part of the JSON response
    except requests.RequestException as e:
        print(f"Error fetching refresh token from external endpoint: {e}")
        return None

def generate_bearer_token(refresh_token):
    try:
        # Data to be sent in the request body
        data = {
            "refreshToken": refresh_token
        }
        # Make a POST request to generate bearer token using the refresh token
        response = requests.post("https://ip/generate_bearer_token", json=data, verify=False)
        response.raise_for_status()  # Raise an exception for HTTP errors (status code 4xx or 5xx)
        data = response.json()
        return data.get("token")  # bearer token is returned as part of the JSON response
    except requests.RequestException as e:
        print(f"Error generating bearer token from refresh token: {e}")
        return None

def deploy(bearer_token):
    try:
        # Data to be sent in the request body
        data = {
            "projectId": "id",
            "inputs": {
               "vCPU": 4,
               "ramGB": 4
            }
        }
        # Headers with authorization token
        headers = {
            'Authorization': f'Bearer {token}'
        }
        # Make a POST request to create VM using bearer token
        response = requests.post("https://ip/create_vm", json=data, headers=headers, verify=False)
        response.raise_for_status()  # Raise an exception for HTTP errors (status code 4xx or 5xx)
        return response.json()
    except requests.RequestException as e:
        print(f"Error creating VM: {e}")
        return None

if __name__ == '__main__':
    app.run(debug=True)  # Remove debug=True in production
