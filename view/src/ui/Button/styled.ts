import styled, { css } from 'styled-components'
import { transparentize } from 'polished'

import { Theme } from './Button'

const primaryStyles = css`
  ${p => p.theme.fonts.text1};

  background: ${p => p.theme.colors.primary};
  box-shadow: 0px 4px 16px ${p => transparentize(0.8, p.theme.colors.primary)};
  transition: box-shadow 0.3s;

  &:not(:disabled):hover {
    box-shadow: 0px 4px 24px ${p => transparentize(0.1, p.theme.colors.primary)};
  }
`

const secondaryStyles = css`
  ${p => p.theme.fonts.text1};

  color: ${p => p.theme.colors.black};
  background: ${p => p.theme.colors.gray};
  box-shadow: 0px 4px 16px ${p => transparentize(0.8, p.theme.colors.darkGray)};
  transition: box-shadow 0.3s;

  &:not(:disabled):hover {
    box-shadow: 0px 4px 24px ${p => transparentize(0.1, p.theme.colors.darkGray)};
  }
`

export const Wrapper = styled.button<{
  fluid?: boolean
  disabled?: boolean
  buttonTheme: Theme
}>`
  width: ${p => p.fluid && '100%'};
  padding: 8px 20px;
  border-radius: 100px;
  line-height: 24px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    opacity: 0.3;
    filter: grayscale(1);
    cursor: default;
  }

  img {
    max-width: 20px;
    margin-right: 10px;
    display: block;
  }

  ${p => {
    switch (p.buttonTheme) {
      case 'primary':
        return primaryStyles
      case 'secondary':
        return secondaryStyles

      default:
        return primaryStyles
    }
  }}
`
