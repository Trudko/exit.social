import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  > button {
    margin-left: 8px;
    font-size: 14px;
  }
`

export const Label = styled.div`
  margin-right: 16px;
  color: ${p => p.theme.colors.darkGray};
  font-size: 12px;
  font-weight: 700;
`

export const Value = styled.div`
  width: 424px;
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray};
  border-radius: 100px;
  display: flex;
  align-items: center;

  > * {
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 700;
    line-height: 22px;
  }

  input {
    overflow: hidden;
    margin-right: 16px;
    color: ${p => p.theme.colors.black};
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
  }

  button {
    color: ${p => p.theme.colors.primary};

    &:hover {
      opacity: 0.7;
    }
  }
`
