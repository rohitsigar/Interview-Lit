import React, { useState } from 'react';
import { auth } from '../../actions/user';
import { useDispatch } from 'react-redux';

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');

  const onSignIn = async () => {
    const res = await auth({ name, email });
    dispatch(res);
  };
  return (
    <div>
      <textarea
        type='text'
        placeholder='Enter Email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <textarea
        type='text'
        placeholder='Enter Name'
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={onSignIn}>Sign in</button>
    </div>
  );
};

export default Login;
