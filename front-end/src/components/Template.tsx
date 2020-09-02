import React from 'react';
import styled from 'styled-components';
import Tree from 'react-d3-tree';

const TemplateWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;


export const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

interface TemplateProps {}

const Template: React.FC<TemplateProps> = ({
  children
}) => {
  return (
    <TemplateWrapper>
      {children}
    </TemplateWrapper>
  )
}


export default Template;