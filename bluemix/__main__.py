#!/usr/bin/env python3
import configparser
import backend
import json

from flask import Flask
from flask_restful import Resource, Api, reqparse

config = configparser.ConfigParser()
config.read('config.ini')
print(config.sections())


recommender = backend.Recommender(config)
#first_places = recommender.get_places("Where to drink a coffee near the Dam Square?")[:5]
#second_places = recommender.get_places("Where to rent a bycicle near the Dam Square?")[:1]

#places = first_places + second_places


#schedule = recommender.plan(places)


#print('Your plan:')
#for idx, dd in schedule:
#    print('Visit:', places[idx].name, ':: +', dd, 'meters')

app = Flask(__name__)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('question')
parser.add_argument('places')

def to_dict(place):
    d = place.__dict__
    del d['duration']
    del d['time_begin']
    return d


class Question(Resource):
    def parse(self):
        args = parser.parse_args()
        question = args['question']
        places = recommender.get_places(question)
        return list(map(to_dict, places))

    def get(self):
        return self.parse()

    def post(self):
        return self.parse()


class Plan(Resource):
    def parse(self):
        args = parser.parse_args()
        print(args['places'])
        places = json.loads(args['places'])
        fs_client = recommender.fs_client

        list_of_places = []
        for place in places:
            if 'time_begin' in place:
                time_begin = place['time_begin']
            else:
                time_begin = None

            if 'duration' in place:
                duration = place['duration']
            else:
                duration = None
            try:
                place = backend.Place(fs_client, None, id=place['id'],
                                      time_begin=time_begin, duration=duration)
                list_of_places.append(place)
            except:
                print('Error')
                continue
        return [{'id': list_of_places[idx].id, 'distance': distance, 'time': time, 'congestion': list_of_places[idx].congestion} for idx, distance, time in recommender.plan(list_of_places)]

    def get(self):
        return self.parse()

    def post(self):
        return self.parse()


api.add_resource(Question, '/ask')
api.add_resource(Plan, '/plan')

if __name__ == '__main__':
    app.run(debug=True)
