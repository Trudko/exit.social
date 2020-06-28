import { css } from 'styled-components'

export const colors = {
  white: '#ffffff',
  black: '#15171a',
  primary: '#4aa0eb',
  green: '#56bb6d',
  orange: '#fa742a',
  red: '#ff101f',
  gray: '#f0f2f5',
  lightGray: '#e5e5e5',
  darkGray: '#86929c',
  softGray: '#f9fafb'
}

export const fonts = {
  h1: css`
    color: ${colors.primary};
    font-size: 40px;
    font-weight: 800;
    line-height: 48px;
  `,
  h2: css`
    color: ${colors.black};
    font-size: 24px;
    font-weight: 800;
    line-height: 32px;
  `,
  h3: css`
    color: ${colors.black};
    font-weight: 700;
    line-height: 24px;
  `,
  h4: css`
    color: ${colors.primary};
    font-weight: 800;
    font-size: 24px;
    line-height: 32px;
  `,
  p1: css`
    color: ${colors.black};
    line-height: 24px;
  `,
  p2: css`
    color: ${colors.black};
    font-size: 12px;
    line-height: 24px;
  `,
  text1: css`
    color: ${colors.white};
    font-weight: 700;
    line-height: 24px;
  `,
  text2: css`
    color: ${colors.green};
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
  `,
  text3: css`
    color: ${colors.darkGray};
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
  `,
  text4: css`
    color: ${colors.darkGray};
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
  `,
  text5: css`
    color: ${colors.black};
    font-size: 16px;
    line-height: 24px;
  `,
  text6: css`
    color: ${colors.black};
    font-size: 12px;
    line-height: 24px;
  `,
  text7: css`
    color: ${colors.white};
    font-size: 16px;
    line-height: 24px;
  `,
  text8: css`
    color: ${colors.primary};
    font-size: 12px;
    font-weight: 700;
    line-height: 16px;
  `,
  label: css`
    color: ${colors.darkGray};
    font-size: 12px;
    font-weight: 700;
    line-height: 24px;
  `
}
