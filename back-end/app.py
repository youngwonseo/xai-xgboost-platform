from flask import Flask
from flask_restful import Api
from api.routes import initialize_routes

app = Flask(__name__)
api = Api(app)
initialize_routes(api)


@app.route('/api/test')
def hello_world():
  return 'Hello, world!'

if __name__ == '__main__':
  app.run(debug=True, host='0.0.0.0', port=5000)