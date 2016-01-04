import json
import foursquare
import requests
import pprint
import time

_WATSON_URL = 'https://dal09-gateway.watsonplatform.net/instance/568/deepqa/v1/question'

class Place(object):
    def __init__(self, fs_client, meta, id=None, time_begin=None, duration=None):
        if id:
            self.id = id
            meta = fs_client.venues(VENUE_ID=self.id, params={})['venue']
            #print(meta)
        else:
            self.id = meta['id']
        self.name = meta['name']
        
        photos = fs_client.venues.photos(VENUE_ID=self.id, params={})
        if photos['photos']['count']:
            url = photos['photos']['items'][0]
            self.photo = url['prefix'] + 'width' + str(url['width']) + url['suffix']

        hours = fs_client.venues.hours(VENUE_ID=self.id, params={})
        self.hours = hours['hours']

        tips = fs_client.venues.tips(VENUE_ID=self.id, params={})
        if tips['tips']['count']:
            first_tip = tips['tips']['items'][0]
            tips_text = first_tip['text']
            tips_author = first_tip['user']['firstName']
            self.tip = {'text' : tips_text, 'author': tips_author}

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

        if time_begin:
            self.time_begin = time_begin
        else:
            self.time_begin = None

        if duration:
            self.duration = duration
        else:
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

        #print(answers['question'])
        lemas = [lema['value'] for lema in answers['question']['synonymList']
                 if lema['partOfSpeech'] == 'noun']
        print('Request:', lemas)

        places = self.fs_client.venues.search(params={'query': ' '.join(lemas),
                                                      'near': 'Amsterdam',
                                                      'limit': nplaces})['venues']
        place_list = []
        for place in places:
            try:
                new_place = Place(self.fs_client, place)
                place_list.append(new_place)
            except IndexError:
                pass
        return place_list

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
        times = [time.time()] 
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

            # TODO
            times.append(times[-1] + 30 * 60)

        return zip(chain, chain_distances, times)
