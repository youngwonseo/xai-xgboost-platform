import { combineReducers  } from 'redux';
import { all } from 'redux-saga/effects';
import model, { modelSaga } from './model';


const rootReducer = combineReducers({
  model,
});

export function* rootSaga() {
  yield all([
    modelSaga()
  ]);
};

export default rootReducer;


export type RootState = ReturnType<typeof rootReducer>;