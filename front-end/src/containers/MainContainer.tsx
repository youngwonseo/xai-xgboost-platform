import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from "react-router";
import Tree from 'react-d3-tree';


import { RootState } from '../modules';
import {
  loadModel
} from '../modules/model';

interface MainContainerProps {}

const MainContainer: React.FC<MainContainerProps> = () => {
  
  const dispatch = useDispatch();
  
  const {
    model,
  } = useSelector(
    (state: RootState) => ({
      model: state.model.model
    })
  );
  
  useEffect(()=>{
    dispatch(loadModel.request());
  },[]);

  return (
    <div className="App" style={{width: '100%', height: '100%'}}>
      {model && <Tree data={model} orientation="vertical"/> }   
    </div>
  );
}


export default withRouter(MainContainer);