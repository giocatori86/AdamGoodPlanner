#!/usr/bin/env python3
import configparser
import backend

config = configparser.ConfigParser()
config.read('config.ini')
print(config.sections())


recommender = backend.Recommender(config)
first_places = recommender.get_places("Where to drink a coffee near the Dam Square?")[:5]
second_places = recommender.get_places("Where to rent a bycicle near the Dam Square?")[:1]

places = first_places + second_places


schedule = recommender.plan(places)


print('Your plan:')
for idx, dd in schedule:
    print('Visit:', places[idx].name, ':: +', dd, 'meters')

