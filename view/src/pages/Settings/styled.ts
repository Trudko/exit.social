import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;

  > div {
    textarea {
      max-width: 100%;
      width: 400px;
    }

    button {
      margin-top: 24px;
    }
  }
`
