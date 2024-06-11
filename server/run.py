from flask import Flask, jsonify, request
from pymongo import MongoClient
from bson.json_util import dumps, ObjectId
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
# MongoDB configuration
MONGODB_URI = "mongodb+srv://redditbot:botnumber2@cluster0.qttwqgk.mongodb.net/users"
client = MongoClient(MONGODB_URI)
db = client.get_database()

@app.route('/api/records', methods=['GET'])
def get_records():
    email = request.args.get('email')
    user = db.baseball.find({'email': email})
    if not user:
        return [], 200

    return dumps(user), 200

@app.route('/api/record', methods=['POST'])
def add_record():
    data = request.json
    db.baseball.insert_one(data)
    return jsonify({'message': 'Record added successfully'}), 201

@app.route('/api/record/<id>', methods=['DELETE'])
def delete_record(id):
    db.baseball.delete_one({'_id': ObjectId(id)})
    return jsonify({'message': 'Record deleted successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)
