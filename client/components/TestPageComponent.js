import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { saveToken } from '../libs/token-libs';
import Router from 'next/router';
const API_SERVER_URL = process.env.API_SERVER_URL || 'http://localhost:3003';
const GOOGLE_CLIENT_ID =
  process.env.GOOGLE_CLIENT_ID ||
  '830741702755-h2vuh5arm3tg3t5bh64lp0d6qog62qhs.apps.googleusercontent.com';

const responseGoogle = response => {
  const content = new Blob(
    [
      JSON.stringify({
        tokenId: response.tokenId,
        user_content: response.profileObj
      })
    ],
    { type: 'application/json' }
  );
  const options = {
    method: 'POST',
    body: content,
    mode: 'cors',
    cache: 'default'
  };
  fetch(`${API_SERVER_URL}/auth`, options).then(r => {
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
        clientId={GOOGLE_CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    );
  }
}

export default TestPageComponent;
