// TODO 최민우, 신동준, 김수민 | FC안에서 함수선언할 때 arrow function로 통일할 지 컨벤션 논의하기

import React, { ReactElement } from 'react';
import { PageWrapper, LoginBtn } from './style';

function LoginPage(): ReactElement {
  // todo 신동준 | 여기서 github API 관련 작업하기
  const onClickLoginBtn = (): void => {
    // todo 신동준 | 작업 후에 console 제거하기 (console은 eslint warning으로 설정)
    console.log(process.env.REACT_APP_GITHUB_LOGIN_URL);
    if (process.env.REACT_APP_GITHUB_LOGIN_URL) {
      window.location.assign(process.env.REACT_APP_GITHUB_LOGIN_URL);
    }

    console.log('Github Login Btn clicked');
  };

  return (
    <PageWrapper>
      <LoginBtn onClick={onClickLoginBtn}>Login in with Github</LoginBtn>
    </PageWrapper>
  );
}

export default LoginPage;
