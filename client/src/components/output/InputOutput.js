import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px;
`;

const Div = styled.div`
  height: 100px;
  flex: 1;
  box-sizing: border-box;
  margin: 20;
  color: ${props => props.error && 'red'};
  background-color: '#eeeeee';
  overflow: scroll;
`;

const InputOutput = ({ input, setInput }) => {
  let output = useSelector(state => state.code.output);
  let error = useSelector(state => state.code.error);

  useEffect(() => {
    console.log(output);
  }, [output]);
  return (
    <Container>
      <Div>
        <textarea
          value={input}
          onChange={e => {
            console.log(e.target.value);
            setInput(e.target.value);
          }}
        />
      </Div>
      <Div error={error === '' ? false : true}>
        <pre>{output === '' ? error : output}</pre>
      </Div>
    </Container>
  );
};

export default InputOutput;
