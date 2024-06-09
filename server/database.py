from pymongo import MongoClient
import os
MONGODB_URI = "mongodb+srv://redditbot:7CUEuXcTahv60cc0@cluster0.qttwqgk.mongodb.net/users"
client = MongoClient()
# 7CUEuXcTahv60cc0 redditbot
def get_db():
    db_uri = MONGODB_URI
    client = MongoClient(db_uri)
    db = client['users'] 
    collection = db['users']  
    return collection

def close_db(e=None):
    client.close()





