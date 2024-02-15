#!/usr/bin/env python3

import requests
import json

def refresh_token():
  headers = {
              'Content-type':'application/json',
              'Accept':'application/json'
            }
  data = {
            "username": "gutturra",
            "password": "G$Gbz3TNAzLN-b"
        }
  try:
        r = requests.post(
                url="https://vmpautomation-dev.stg.nonprod.vmware.cba/csp/gateway/am/api/login?access_token=",
                json=data,
                headers=headers,
                verify=False
            )
        r.raise_for_status()
  except Exception as err:
            print(err)
  else:
            print("Successful in getting the Refresh Token")
            if r.status_code == 200:
                raw_content = r.content
                token_auth = json.loads(raw_content)
                refreshToken = token_auth['refresh_token']
                return refreshToken
                
def bearer_token(refreshToken):
  headers = {
              'Content-type':'application/json',
              'Accept':'application/json'
            }
  data = {
    "refreshToken": refreshToken
    }
  try:
        r = requests.post(
                url="https://vmpautomation-dev.stg.nonprod.vmware.cba/iaas/api/login",
                json=data,
                headers=headers,
                verify=False
            )
        r.raise_for_status()
  except Exception as err:
            print(err)
  else:
            print("Successful in getting the Bearer Token")
            if r.status_code == 200:
                raw_content = r.content
                token_auth = json.loads(raw_content)
                bearer_token = token_auth['token']
                return bearer_token
                
def deploy(bearer_token):
  headers = {
              'Content-type':'application/json',
              'Accept':'application/json',
              'Authorization':'Bearer %s' %bearer_token
            }
  data = {
    "projectId": "0d5d4d40-53f6-44df-963a-3593955dbd0c",
    "inputs": {
        "vCPU": 4,
        "ramGb": 4
    }
  }
  try:
        r = requests.post(
                url="https://vmpautomation-dev.stg.nonprod.vmware.cba/catalog/api/items/4c31e0fc-02f9-354d-b4c7-088ea2d0bfad/request",
                json=data,
                headers=headers,
                verify=False
            )
        r.raise_for_status()
  except Exception as err:
            print(err)
  else:
            print("Successful deployment")
            if r.status_code == 200:
                raw_content = r.content
                print(raw_content) 
               

val = refresh_token()
val2 = bearer_token(val)
deploy(val2)
