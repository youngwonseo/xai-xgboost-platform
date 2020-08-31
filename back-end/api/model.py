from flask import Response, request, reqparse



from flask_restful import Resource, reqparse
from resources.errors import InternalServerError
import os
import datetime

parser = reqparse.RequestParser()


class ModelApi(Resource):

  def post(self):
    try:
      data = parser.parse_args()
      
      # if data['file']:
      #   upload_path = os.path.join('../models')
      filename = str(int(datetime.datetime.now().timestamp() * 1000))
      path = os.path.join('../models', filename)
      data['file'].save(path)

    except Exception as e:
      raise InternalServerError
  

  def getTree(model):
    # model.
    None


  def getFeatureImportances(model):
    None
    # return model.feature_importances_