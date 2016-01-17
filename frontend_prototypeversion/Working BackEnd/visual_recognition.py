#!/usr/bin/env python3
import requests
import configparser

config = configparser.ConfigParser()
config.read('config.ini')
print(config.sections())


user = config['VisualRecognition']['user']
password = config['VisualRecognition']['password']

files = {'images_file': open('photo.zip', 'rb')}
url = 'https://watson-api-explorer.mybluemix.net/visual-recognition-beta/api/v2/classify?version=2015-12-02'
r= requests.post(url, auth=(user, password), files=files)
if (r.status_code != requests.codes.ok):
    r.raise_for_status()
print(r.text)
