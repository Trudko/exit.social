import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 150px;
    > div {
      textarea {
        max-width: 100%;
        width: 500px;
    }

    > button {
        margin-top: 48px;
        width: 220px;
    }
  }
`

export const Title = styled.div`
  ${p => p.theme.fonts.h2};
  text-align: center;
`

export const Settings = styled.div`
  margin-top: 30px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
`