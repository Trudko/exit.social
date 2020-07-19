import styled from 'styled-components'
import { lighten } from 'polished'

export const Wrapper = styled.div<{
  invalid?: boolean
}>`
  padding: 8px 16px;
  background: ${p =>
    p.invalid ? lighten(0.3, p.theme.colors.red) : p.theme.colors.softGray};
  border: 1px solid
    ${p => (p.invalid ? p.theme.colors.red : p.theme.colors.lightGray)};
  border-radius: 100px;
  transition: background 0.3s, border 0.15s;
  display: flex;
  align-items: center;

  &:focus-within {
    border: 1px solid ${p => p.theme.colors.darkGray};
  }

  img {
    width: 16px;
    height: 16px;
    margin-right: 12px;
    object-fit: contain;
  }

  input {
    height: 27px;
    min-width: 186px;
    color: ${p => p.theme.colors.black};
    font-size: 14px;
    font-weight: 700;
    flex: 1;
    
    &::placeholder {
      color: ${p => p.theme.colors.darkGray};
    }
  }

  input:invalid {
    box-shadow:none;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }

`
