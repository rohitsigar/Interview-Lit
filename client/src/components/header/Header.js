import React from 'react';
import ToggleTheme from './ToggleTheme';
import styled from 'styled-components';

const HeadeContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Header = props => {
  return (
    <HeadeContainer>
      <ToggleTheme {...props} />
    </HeadeContainer>
  );
};

export default Header;
