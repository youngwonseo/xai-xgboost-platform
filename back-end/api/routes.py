from .model import ModelApi

def initialize_routes(api):
  api.add_resource(ModelApi, '/api/model')

