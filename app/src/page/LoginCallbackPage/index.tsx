import React, { ReactElement, useEffect, useState } from 'react';
import { createLoginToken, createUserRepo } from '../../apis';

function LoginCallbackPage(): ReactElement {
  const [repoName, setRepoName] = useState('');
  const onChangeRepoName = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setRepoName(e.target.value);
  };
  const onClickCreateRepo = async (): Promise<any> => {
    try {
      const response = await createUserRepo(repoName);
      alert('repo 생성 성공');
      console.log(response);
    } catch (error) {
      alert('repo 생성 실패');
      console.log(error);
    }
  };

  useEffect(() => {
    const url: URL = new URL(window.location.href);
    const authorizationCode: string | null = url.searchParams.get('code');
    if (authorizationCode) {
      createLoginToken(authorizationCode)
        .then((response) => {
          localStorage.setItem('jwtToken', response.data.token);
          console.log(response.data.token);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    }
  }, []);
  return (
    <div>
      <input value={repoName} onChange={onChangeRepoName} />
      <button type='button' onClick={onClickCreateRepo}>
        Repo 생성
      </button>
    </div>
  );
}

export default LoginCallbackPage;
