#!/usr/bin/env python3
import requests
import configparser

config = configparser.ConfigParser()
config.read('config.ini')
print(config.sections())


user = config['TextToSpeech']['user']
password = config['TextToSpeech']['password']

url = 'https://watson-api-explorer.mybluemix.net/text-to-speech/api/v1/synthesize?accept=audio%2Fogg%3B%20codecs%3Dopus&voice=en-US_MichaelVoice&text='
url += 'Hello World'
r= requests.post(url, auth=(user, password))
if (r.status_code != requests.codes.ok):
    r.raise_for_status()

with open('out.ogg', 'wb') as fd:
    for chunk in r.iter_content(1000):
        fd.write(chunk)
