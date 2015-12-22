#!/usr/bin/env python3
import json
import requests
import configparser

config = configparser.ConfigParser()
config.read('config.ini')
print(config.sections())


user = config['QA']['user']
password = config['QA']['password']

url = 'https://dal09-gateway.watsonplatform.net/instance/568/deepqa/v1/question'

data = {
    "question": {
        "questionText": "Whats a fun way to go around the city?",
        "formattedAnswer": True,
        "items": 10
    }
}


headers = {
    'X-SyncTimeout': 30,
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Cache-Control': 'no-cache'
}

r = requests.post(url, auth=(user, password),
                  data=json.dumps(data), headers=headers)
if (r.status_code != requests.codes.ok):
    r.raise_for_status()
print(r.text)
