from flask import request
from flask_restful import Resource, reqparse
# from resources.errors import InternalServerError
import os
import datetime
import re

import xgboost as xgb
from xgboost import XGBClassifier

#  test
from sklearn.model_selection import train_test_split
from sklearn import datasets


parser = reqparse.RequestParser()


class ModelApi(Resource):
  # 파일 업로드 없이 호출
  def get(self):

    data = datasets.load_breast_cancer()
    # 속성데이터
    X = data.data
    # 클래스 데이터
    y = data.target

    x_train, x_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=7)

    dtrain = xgb.DMatrix(x_train, label=y_train, feature_names=data.feature_names)
    model = xgb.train({}, dtrain, 10)

    
    df = model.trees_to_dataframe()
    tree_list = df.Tree.unique()
    dump = model.get_dump()


    roots = []
    for i in list(tree_list):

      result = re.split('\n|\t', dump[i])
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
      roots.append({
        'gain': df.loc[df.Tree == i].Gain.sum(),
        'tree': self.get_node('0', nodes)
      })
      # end of for    
    

    return {
      'trees': roots,
      'feature_importance': model.get_score(importance_type='gain')
    }
  
  def get_node(self, id, nodes):
    node = {
      'children': []
    }
    
    info = nodes[id]
    if len(info['leaf']) > 0:
      node['name'] = info['leaf'][0]

    if len(info['name']) > 0:
      node['name'] = info['name'][0]

    if len(info['yes']) > 0:
      node['children'].append(self.get_node(info['yes'][0], nodes))

    if len(info['no']) > 0:
      node['children'].append(self.get_node(info['no'][0], nodes))
    
    return node

    



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
