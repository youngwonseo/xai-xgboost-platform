import React, { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';




const App = () => {
  const [data, setData] = useState<any>({"children": [{"children": [{"children": [{"children": [], "name": "-0.187401578"}, {"children": [], "name": "-0.122330092"}], "name": "f5<30.9500008"}, {"children": [{"children": [], "name": "-0.177142859"}, {"children": [], "name": "-0.0338028185"}], "name": "f5<26.3500004"}], "name": "f7<28.5"}, {"children": [{"children": [{"children": [], "name": "-0.112000003"}, {"children": [], "name": "0.0250000004"}], "name": "f1<161.5"}, {"children": [{"children": [], "name": "0.0400000028"}, {"children": [], "name": "0.13333334"}], "name": "f1<157.5"}], "name": "f5<29.9500008"}], "name": "f1<127.5"},);

  useEffect(()=>{
    // const data = [
    //   { name: 'a' },
    //   { name: 'b', parent: 'a' },
    //   { name: 'c', parent: 'a' },
    //   { name: 'd', parent: 'b' },
    // ]
    
    // const stratify = d3
    //   .stratify()
    //   .id((d: any) => d.name)
    //   .parentId((d: any) => d.parent);

    // const tree = d3.tree().size([ 300, 300])

    // const rootNode = stratify(data);
    // const treeData = tree(rootNode);
    
    
    // const svg = d3.create('svg')
    //   .attr('width', 500)
    //   .attr('height', 500);

    // const graph = svg.append('g');
    
    // const nodes = graph
    //   .selectAll('.node')
    //   .data(treeData.descendants());

    // const enterNodes = nodes
    //   .enter()
    //   .append("g")
    //   .attr("class", "node")
    //   .attr("transform", (d: any) => `translate(${d.x}, ${d.y})`); 

    // // append rects to enter nodes
    // enterNodes
    //   .append("rect")
    //   .attr("fill", "#aaa")
    //   .attr("stroke", "#555")
    //   .attr("stroke-width", 2)
    //   .attr("width", (d: any) => d.data.name.length * 20) // name의 길이만큼 width값 설정
    //   .attr("height", 50);
    
    //   setTreeVis(svg)
    //   svg.node()
  },[]);

  const svgSquare = {
    shape: 'rect',
    shapeProps: {
      width: 20,
      height: 20,
      x: -10,
      y: -10,
    }
  }

  return (
    <div className="App" style={{width: '100%', height: '100%'}}>
      <Tree data={data} orientation="vertical"/>    
    </div>
  );
}

export default App;
