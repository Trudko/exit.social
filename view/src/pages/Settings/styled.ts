import styled from 'styled-components'
import mediaQueries from "utils/mediaQueries";

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 50px;
    > div {
      textarea {
        max-width: 100%;
        width: 350px;

        @media ${mediaQueries.laptop} {
          width: 500px;
        }
    }

    > button {
        margin-top: 48px;
        width: 220px;
    }
  }

  @media ${mediaQueries.laptop} {
    padding-top: 150px;
  }
`

export const Title = styled.div`
  ${p => p.theme.fonts.h2};
  text-align: center;
`

export const Settings = styled.div`
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${mediaQueries.laptop} {
    width: 450px;
  }
`