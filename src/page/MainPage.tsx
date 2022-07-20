// TODO 최민우, 신동준, 김수민 | FC안에서 함수선언할 때 arrow function로 통일할 지 컨벤션 논의하기
// TODO 최민우 | styling만 따로 파일로 빼서 import 하기
// TODO 공통적으로 많이쓰이는 theme color 변수화하기

import React, { ReactElement } from 'react';
import styled from '@emotion/styled';

const PageWrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginBtn = styled.button`
  width: 300px;
  height: 70px;
  background-color: gray;
  font-size: 20px;
`;

function MainPage(): ReactElement {
  // todo 신동준 | 여기서 github API 관련 작업하기
  const onClickLoginBtn = (): void => {
    console.log('Github Login Btn clicked');
  };

  return (
    <PageWrapper >
      <LoginBtn onClick={onClickLoginBtn}>Login in with Github</LoginBtn>
    </PageWrapper>
  );
}

export default MainPage;