import React, { ReactElement, useEffect } from 'react';
import { createLoginToken } from '../../apis';

function LoginCallbackPage(): ReactElement {
  useEffect(() => {
    const url: URL = new URL(window.location.href);
    const authorizationCode: string | null = url.searchParams.get('code');

    if (authorizationCode && !localStorage.getItem('jwtToken')) {
      createLoginToken(authorizationCode)
        .then((response) => {
          localStorage.setItem('jwtToken', response.data.token);
          // TODO: 신동준 | MainPage로 Routing.
        })
        .catch(() => {
          // TODO: 신동준 | error 사용자에게 어떻게 보여줄 것인지 생각.
        });
    }
  }, []);

  return <div>Loading...</div>;
}

export default LoginCallbackPage;
