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

#print(answers['question']['synonymList'])
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

coordinates = []
for place in places:
    print('--------------')
    print('Name:', place['name'])
    print('ID:', place['id'])
    if 'address' in place['location']:
        print('Location:', place['location']['address'])#, place['location']['postalCode'])
    
    coordinates.append('%f,%f' % (place['location']['lat'], place['location']['lng']))
    print('Coordinates: %f,%f' % (place['location']['lat'], place['location']['lng']))
    print('Category:', place['categories'][0]['name'])
    if 'phone' in place['contact']:
        print('Contact:', place['contact']['phone'])

#pprint.pprint(dir(places))

origins = '|'.join(coordinates)
destinations = origins

url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&key=%s' \
            % (origins,
               destinations,
               config['Google']['key'])
r = requests.get(url)
#print(r.text)
distances = json.loads(r.text)['rows']
durations = [[cell['duration']['value'] for cell in row['elements']] for row in distances]
distances = [[cell['distance']['value'] for cell in row['elements']] for row in distances]
print(durations)
print(distances)

# Okay, let's solve via some TSP with some greedy Viterbi algorithm
visited = [False for i in range(len(coordinates))]
visited[0] = True
chain = [0]
chain_distances = [0]
while len(chain) != len(coordinates):
    min_distance = 10000000
    next_place = None
    for i in range(len(coordinates)):
        if visited[i] == False:
            d = distances[chain[-1]][i]
            if d < min_distance:
                min_distance = d
                next_place = i
    visited[next_place] = True
    chain.append(next_place)
    chain_distances.append(min_distance)

print('Your plan:')
for idx, dd in zip(chain, chain_distances):
    print('Visit:', places[idx]['name'], ':: +', dd, 'meters')



#pprint.pprint(places)
