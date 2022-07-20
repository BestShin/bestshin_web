// 전역적으로 쓰이는 Theme Color 여기서 선언하고 변수처럼 쓰기
import { css } from '@emotion/css';

export const ThemeColor = {
  gray: '#D9D9D9'
};

export const Styles = {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  flex_center: css`
    display: flex;
    justify-content: center;
    align-items: center;
  `
};