# minimal_flask_app.py
from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/test', methods=['GET'])
def test_route():
    return jsonify({"message": "Hello, World!"})

if __name__ == '__main__':
    app.run(port=5000)
