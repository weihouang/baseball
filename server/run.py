from flask import Flask, jsonify, request
from flask_cors import CORS

from database import get_db, close_db


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})  # Allow requests from your React app's origin


collection = get_db()

@app.route('/records', methods=['GET'])
def get_records():
    records = list(collection.find({}))
    for record in records:
        record['_id'] = str(record['_id'])  # Convert ObjectId to string
    return jsonify(records)

@app.route('/records', methods=['POST'])
def add_record():
    data = request.json
    result = collection.insert_one(data)
    return jsonify({'status': 'Record added', 'id': str(result.inserted_id)})

@app.route('/records', methods=['DELETE'])
def clear_records():
    collection.delete_many({})
    return jsonify({'status': 'All records cleared'})

if __name__ == '__main__':
    app.run(debug=False)