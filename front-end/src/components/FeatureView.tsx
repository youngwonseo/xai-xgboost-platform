import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactEcharts from 'echarts-for-react';



const FeatureViewWrapper = styled.div`
  flex: 1;
  display: flex;
  height: 350px;
`;

interface FeatureViewProps {
  features: any;
}

const FeatureView: React.FC<FeatureViewProps> = ({
  features,
}) => {

  
  const [option, setOption] = useState({});

  useEffect(()=>{
    setOption({
      grid: {
        left: 10,
        top: 10,
        bottom: 10,
        right: 10,
        containLabel: true,
      },
      xAxis: {
        type: 'value',
      },
      yAxis: {
        type: 'category',
        data: Object.keys(features)
      },
      series: [{
        type: 'bar',
        data: Object.values(features)
      }]
    });
    

  },[])

  return (
    <FeatureViewWrapper>
      <ReactEcharts
        option={option}
        lazyUpdate={true}
        theme={"theme_name"}
        style={{height: '100%', width: '100%'}}
        onEvents={{
          click: (params) => {
            
          }
        }}
      />
    </FeatureViewWrapper>
  )
}


export default FeatureView;