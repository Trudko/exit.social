import styled from 'styled-components'
import { lighten } from 'polished'

export const Wrapper = styled.div``

export const Label = styled.label`
  ${p => p.theme.fonts.label};

  margin-bottom: 6px;
  display: block;
`

export const Value = styled.div<{
  invalid?: boolean
}>`
  overflow: hidden;
  border: 1px solid
    ${p => (p.invalid ? p.theme.colors.red : p.theme.colors.lightGray)};
  border-radius: 20px;

  textarea {
    min-width: 186px;
    padding: 12px 16px;
    background: ${p =>
      p.invalid ? lighten(0.3, p.theme.colors.red) : p.theme.colors.softGray};
    border: none;
    font-family: inherit;
    color: ${p => p.theme.colors.black};
    font-size: 14px;
    font-weight: 700;
    transition: background 0.3s, border 0.15s;
    display: flex;
    align-items: center;
    resize: none;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${p => p.theme.colors.darkGray};
    }

    ::-webkit-scrollbar {
      background-color: ${p =>
        p.invalid ? lighten(0.3, p.theme.colors.red) : p.theme.colors.softGray};
      width: 16px;
    }

    ::-webkit-scrollbar-track {
      background-color: ${p =>
        p.invalid ? lighten(0.3, p.theme.colors.red) : p.theme.colors.softGray};
    }

    ::-webkit-scrollbar-thumb {
      background-color: #babac0;
      border-radius: 16px;
      border: 5px solid
        ${p =>
          p.invalid
            ? lighten(0.3, p.theme.colors.red)
            : p.theme.colors.softGray};
    }

    ::-webkit-scrollbar-button {
      display: none;
    }
  }
`
