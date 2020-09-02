import React from 'react';
import styled from 'styled-components';
import Tree from 'react-d3-tree';

const TreeViewWrapper = styled.div`
  flex: 1;
  display: flex;
  height: 400px;
`;

interface TreeViewProps {
  model: any;
}

const TreeView: React.FC<TreeViewProps> = ({
  model
}) => {
  return (
    <TreeViewWrapper>
      <Tree data={model} orientation="vertical"/>
    </TreeViewWrapper>
  )
}


export default TreeView;