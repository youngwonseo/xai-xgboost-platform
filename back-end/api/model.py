from flask import request
from flask_restful import Resource, reqparse
# from resources.errors import InternalServerError
import os
import datetime
import re

from xgboost import XGBClassifier

#  test
from sklearn.model_selection import train_test_split
from sklearn import datasets


parser = reqparse.RequestParser()


class ModelApi(Resource):

  def learn(self):
    # 데이터 불러오기
    data = datasets.load_breast_cancer()
    # 속성데이터
    X = data.data
    # 클래스 데이터
    y = data.target

    x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=7)

    model = XGBClassifier()
    model.fit(x_train, y_train)
    # xgb.load_model('./models/model.json')
    model.save_model('./models/breath_cancer')


  def get(self):
    
    model = XGBClassifier()
    model.load_model('./models/breath_cancer')
    

    return {
      'tree': self.getTree(model),
      'feature_importances': self.getFeatureImportances(model)
    }
    

    



  def post(self):
    try:
      data = parser.parse_args()
      
      # if data['file']:
      #   upload_path = os.path.join('../models')
      filename = str(int(datetime.datetime.now().timestamp() * 1000))
      path = os.path.join('../models', filename)
      data['file'].save(path)

    except Exception as e:
      raise Exception
  

  def getTree(self, model):
    trees = model.get_booster().get_dump()
    
    result = re.split('\n|\t', trees[0])
    result = list(filter(lambda x: x != '', result))
    result = list(map(lambda x: x.split(':'), result))

    nodes = { node[0] : 
      { 
        'name': re.findall("\[([^]]+)\]", node[1]),
        'yes': re.findall('yes=([0-9]*)', node[1]),
        'no': re.findall('no=([0-9]*)', node[1]),
        'leaf': re.findall('leaf=([-0-9.]*)', node[1])
      } for node in result 
    }

    root = self.getNode('0', nodes)

    return root

  def getNode(self, id, nodes):
    node = {
      'children': []
    }
    
    info = nodes[id]
    if len(info['leaf']) > 0:
      node['name'] = info['leaf'][0]

    if len(info['name']) > 0:
      node['name'] = info['name'][0]

    if len(info['yes']) > 0:
      node['children'].append(self.getNode(info['yes'][0], nodes))

    if len(info['no']) > 0:
      node['children'].append(self.getNode(info['no'][0], nodes))
    
    return node


  def getFeatureImportances(self, model):
    return model.get_booster().get_score()