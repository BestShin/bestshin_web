import React, { ReactElement, useEffect } from 'react';
import { createLoginToken } from '../../apis/login';

function LoginCallbackPage(): ReactElement {
  useEffect(() => {
    const url: URL = new URL(window.location.href);
    const authorizationCode: string | null = url.searchParams.get('code');
    if (authorizationCode) {
      console.log(authorizationCode);
      const response = createLoginToken(authorizationCode);
      console.log(response);
    }
  }, []);
  return <div>LoginCallbackPage</div>;
}

export default LoginCallbackPage;
