# CBA_SuperBorker_MVP

### Steps to Execute the Python Flask file :

#### Update the parameter file "index.json" with ARIA API, Worker node IP Addresses & Worker node Port

    "aria_api" : "<ARIA_API>",
    "worker_node_ip" : "<WORKER_NODE_IP>",
    "worker_node_port" : <WORKER_NODE_PORT>

#### Update the Service Account credential file "service_account_credentials.txt"
Encode the Credentials of Service Account by using Base64 Encoding tool.

    base64_encoded_username
    base64_encoded_password

#### Start the Service 
Run the Service Manually:
python3 aria_automation.py

Run the Service in background:
nohup python3 aria_automation.py &

#### API EndPoints 
Deploy Aria Automation:
- Endpoint: /api/deploy
- Method: POST
- Payload: JSON object with lan_id

Update Transactions:
- Endpoint: /api/update_transactions
- Method: GET
- Query Parameters: deployment_id




