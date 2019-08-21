import json
import sys
import urllib.request
from pymongo import MongoClient
# pprint library is used to make the output look more pretty
from pprint import pprint

client = MongoClient('mongodb://localhost:27017/')
db = client.currency

currency_url = "http://data.fixer.io/api/symbols?access_key=" + sys.argv[1]
data = urllib.request.urlopen(currency_url).read().decode()

# parse json object
currency = json.loads(data)
db['currency'].insert_one(currency)

# download raw json object
rates_url = "http://data.fixer.io/api/latest?access_key=" + sys.argv[1]
data = urllib.request.urlopen(rates_url).read().decode()

# parse json object
rates = json.loads(data)
db['rates'].insert_one(rates)
