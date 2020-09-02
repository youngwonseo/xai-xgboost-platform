import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from "react-router";

import Template, { Row } from '../components/Template';
import TreeView from '../components/TreeView';
import FeatureView from '../components/FeatureView';
import ModelView from '../components/ModelView';


import { RootState } from '../modules';
import {
  loadModel
} from '../modules/model';

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = () => {
  
  const dispatch = useDispatch();
  const [ selectedTreeIdx, setSelectedTreeIdx] = useState(0);
  const {
    model,
  } = useSelector(
    (state: RootState) => ({
      model: state.model.model
    })
  );
  
  useEffect(()=>{
    dispatch(loadModel.request());
  },[dispatch]);


  const handleSelectIdx = (idx: any) => {
    setSelectedTreeIdx(idx);
  }
  return (
    <Template>
      {model && 
      <>
        <Row>
          <ModelView models={model.trees} handleSelectIdx={handleSelectIdx}/>
          <FeatureView features={model.feature_importance}/>
        </Row>
        <Row>
          <TreeView model={model.trees[selectedTreeIdx].tree}/>
        </Row>
      </>
      }
    </Template>
  );
}


export default withRouter(MainContainer);