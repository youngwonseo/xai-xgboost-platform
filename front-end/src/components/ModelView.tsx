import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';


const ModelViewWrapper = styled.div`
  flex: 1;
  display: flex;
`;

interface ModelViewProps {
  models: any;
  handleSelectIdx: any;
}

const ModelView: React.FC<ModelViewProps> = ({
  models,
  handleSelectIdx
}) => {

  const [option, setOption] = useState({});

  useEffect(()=>{

    console.log(models)
    setOption({
      grid: {
        left: 20,
        top: 20,
        bottom: 20,
        right: 20,
        containLabel: true,
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      series: [{
        type: 'pie',
        data: models.map((m:any, idx: any)=>({
          value: m.gain,
          name: 'model ' + (idx+1),
        }))
      }]
    });
    

  },[])

  return (
    <ModelViewWrapper>
      <ReactEcharts
        option={option}
        lazyUpdate={true}
        theme={"theme_name"}
        style={{height: '100%', width: '100%'}}
        onEvents={{
          click: (params) => {
            handleSelectIdx(params.dataIndex)
          }
        }}
      />
    </ModelViewWrapper>
  )
}


export default ModelView;