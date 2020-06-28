import styled from 'styled-components'

export const Wrapper = styled.span<{
  checked?: boolean
  disabled?: boolean
}>`
  display: flex;
  align-items: center;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};

  input {
    padding: 4px;
    width: 16px;
    height: 16px;
    border-radius: 2px;
    border-color: ${p =>
      p.checked ? p.theme.colors.primary : p.theme.colors.darkGray};
    background: ${p => (p.checked ? p.theme.colors.primary : 'transparent')};
    opacity: ${p => (p.checked ? 1 : 0.5)};
    cursor: pointer;
  }

  .label {
    ${p => p.theme.fonts.text8};
    margin-left: 10px;
    text-transform: uppercase;
    color: ${p =>
      p.checked ? p.theme.colors.primary : p.theme.colors.darkGray};
    user-select: none;
  }
`
