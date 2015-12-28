import json
import foursquare
import requests
import pprint

_WATSON_URL = 'https://dal09-gateway.watsonplatform.net/instance/568/deepqa/v1/question'

class Place:
    def __init__(self, meta):
        self.name = meta['name']
        self.id = meta['id']
        location = meta['location']
        if 'address' in location:
            self.location = location['address']
        else:
            self.location = None

        self.coordinate = (location['lat'], location['lng'])
        self.category = meta['categories'][0]['name']

        if 'phone' in meta['contact']:
            self.phone = meta['contact']['phone']
        else:
            self.phone = None

        self.time_begin = None
        self.duration = None

class Recommender:
    def __init__(self, config):
        self.config = config
        fs_config = config['Foursquare']
        self.fs_client = foursquare.Foursquare(client_id=fs_config['client_id'],
                                               client_secret=fs_config['client_secret'])

    def get_places(self, question, nplaces=10):
        watson_config = self.config['QA']
        user = watson_config['user']
        password = watson_config['password']

        data = {
            "question": {
                "questionText": question,
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


        r = requests.post(_WATSON_URL, auth=(user, password),
                          data=json.dumps(data), headers=headers)

        if r.status_code != requests.codes.ok:
            r.raise_for_status()
            return

        answers = json.loads(r.text)

        lemas = [lema['value'] for lema in answers['question']['synonymList']
                 if lema['partOfSpeech'] == 'noun']
        print('Request:', lemas)

        places = self.fs_client.venues.search(params={'query': ' '.join(lemas),
                                                      'near': 'Amsterdam',
                                                      'limit': nplaces})['venues']
        return [Place(place) for place in places]

    def plan(self, places):
        coordinates = ['%f,%f' % place.coordinate for place in places] 
        origins = '|'.join(coordinates)
        destinations = origins

        url = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&key=%s' \
                    % (origins,
                       destinations,
                       self.config['Google']['key'])
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

        return zip(chain, chain_distances)