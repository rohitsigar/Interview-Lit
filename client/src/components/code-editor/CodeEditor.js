import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { executeCode, setLoadingTrue } from '../../actions/code';
import { useDispatch, useSelector } from 'react-redux';
import InputOutput from '../output/InputOutput';

const CodeEditor = ({ theme }) => {
  const loading = useSelector(state => state.code.isFetching);
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [language, setLanguage] = useState('c');
  const [input, setInput] = useState('');
  const dispatch = useDispatch();
  const valueGetter = useRef();

  const handleEditorDidMount = _valueGetter => {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  };

  const SubmitCode = async () => {
    dispatch(setLoadingTrue());
    const res = await executeCode(valueGetter.current(), language, input);
    console.log(res);
    dispatch(res);
  };

  const changeLanguage = e => {
    setLanguage(e.target.value);
  };

  return (
    <>
      <select value={language} onChange={changeLanguage}>
        <option value='c'>C</option>
        <option value='cpp'>C++</option>
        <option value='python'>Python</option>
        <option value='javascript'>Javascript</option>
        <option value='java'>Java</option>
      </select>
      <button onClick={SubmitCode} disabled={!isEditorReady}>
        {loading ? 'Loading..' : 'Submit'}
      </button>
      <Editor
        height='70vh'
        language={language}
        theme={theme === 'dark' ? 'vs-dark' : 'light'}
        editorDidMount={handleEditorDidMount}
      />
      <InputOutput input={input} setInput={setInput} theme={theme} />
    </>
  );
};

export default CodeEditor;
