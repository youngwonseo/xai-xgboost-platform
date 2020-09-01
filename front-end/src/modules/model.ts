import {
  createAction,
  createAsyncAction,
  ActionType,
  createReducer
} from 'typesafe-actions';
import { AxiosError } from 'axios';

import produce from 'immer';
import {
  takeLatest,
  takeEvery
} from 'redux-saga/effects';
import * as modelAPI from '../lib/api/model';

import createAsyncSaga, {
  createActionTypes
} from '../lib/createAsyncSaga';


const [
  LOAD_MODEL, 
  LOAD_MODEL_SUCCESS, 
  LOAD_MODEL_FAILURE
] = createActionTypes('model/LOAD_MODEL');

export const loadModel = createAsyncAction(
  LOAD_MODEL, 
  LOAD_MODEL_SUCCESS, 
  LOAD_MODEL_FAILURE
)<undefined, any, AxiosError>();

const loadModelSaga = createAsyncSaga(LOAD_MODEL, modelAPI.loadModel);

export function* modelSaga() {
  yield takeLatest(LOAD_MODEL, loadModelSaga);
}



interface ModelState {
 model: any;
}


const initialState: ModelState = {
  model: null
}


const model = createReducer<ModelState, any>(initialState, {
  [LOAD_MODEL_SUCCESS]: (state, { payload: model}) => {
    return {
      ...state,
      model
    }
  }
});


export default model;