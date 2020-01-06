import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { saveToken, removeToken } from '../libs/token-libs';
import Router from 'next/router';

const responseGoogle = response => {
  const content = new Blob(
    [JSON.stringify({ user_content: response.profileObj })],
    { type: 'application/json' }
  );
  const options = {
    method: 'POST',
    body: content,
    mode: 'cors',
    cache: 'default'
  };
  fetch('http://localhost:3003/auth', options).then(r => {
    r.json().then(user => {
      saveToken(user.token);
      Router.push('/');
    });
  });
};

class TestPageComponent extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <GoogleLogin
        clientId="830741702755-h2vuh5arm3tg3t5bh64lp0d6qog62qhs.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

export default TestPageComponent;
