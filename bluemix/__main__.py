#!/usr/bin/env python3
import json
import requests
import configparser
import foursquare
import pprint



config = configparser.ConfigParser()
config.read('config.ini')
print(config.sections())


user = config['QA']['user']
password = config['QA']['password']

url = 'https://dal09-gateway.watsonplatform.net/instance/568/deepqa/v1/question'

data = {
    "question": {
        "questionText": "Where to drink a coffee near the Dam Square?",
        "formattedAnswer": False,
        "items": 1
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

answers = json.loads(r.text)

print(answers['question']['synonymList'])
lemas = [lema['value'] for lema in answers['question']['synonymList']
         if lema['partOfSpeech'] == 'noun']
print('Request:', lemas)

client = foursquare.Foursquare(client_id=config['Foursquare']['client_id'],
                               client_secret=config['Foursquare']['client_secret'],
                               redirect_uri='http://fondu.com/oauth/authorize')

#auth_uri = client.oauth.auth_url()
#print(auth_uri)
#access_token = client.oauth.get_token(config['Foursquare']['oauth'])
#print(access_token)
#client.set_access_token(access_token)

places = client.venues.search(params={'query': ' '.join(lemas),
                                      'near': 'Amsterdam',
                                      'limit': 10})['venues']

for place in places:
    print('--------------')
    print('Name:', place['name'])
    print('ID:', place['id'])
    if 'address' in place['location']:
        print('Location:', place['location']['address'])#, place['location']['postalCode'])
    print('Category:', place['categories'][0]['name'])
    if 'phone' in place['contact']:
        print('Contact:', place['contact']['phone'])

#pprint.pprint(dir(places))

#pprint.pprint(places)
