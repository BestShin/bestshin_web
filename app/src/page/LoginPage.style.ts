import styled from '@emotion/styled';
import { ThemeColor } from '../util/style';

export const PageWrapper = styled.div`
height: 100%;
// TODO 최민우 | mixin처럼 함수화 하는 방법생각해보기
display: flex;
justify-content: center;
align-items: center;
`;

export const LoginBtn = styled.button`
width: 300px;
height: 70px;
background-color: ${ThemeColor.gray};
font-size: 20px;
`;