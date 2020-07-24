import styled from 'styled-components'
import mediaQueries from "utils/mediaQueries";

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  position: relative;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
  height: 185px;
  align-items: center;
  justify-content: center;

  @media ${mediaQueries.laptop} {
    flex-direction: row;
    justify-content: space-between;
    padding: 24px;
    height: 100px;
    margin: 0px;
  }

  button {
    margin-top: 20px;
    span {
      margin-left: 10px;
    }
  }
`

export const Title = styled.div`
  ${p => p.theme.fonts.h2};
`

export const PayoutSetup = styled.div`
  margin-right: 8px;
  padding-bottom: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  @media ${mediaQueries.laptop} {
    flex-direction: row;
  }

  .pointsValue {
    margin: 0 8px;

    input {
      width: 96px;
      min-width: auto;
    }
  }
`

export const PayoutWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 20px;

  @media ${mediaQueries.laptop} {
    width: initial;
    margin-top: 0px;
  }
`;

export const Label = styled.div`
  ${p => p.theme.fonts.label};
  text-align: right;

  @media ${mediaQueries.laptop} {
    width: 110px;
  }
`

export const Content = styled.div`
  padding: 24px 12px;
  background: ${p => p.theme.colors.softGray};

  @media ${mediaQueries.laptop} {
    padding: 24px;
  }
`

export const Info = styled.div`
  ${p => p.theme.fonts.text5};
  background: ${p => p.theme.colors.gray};
  padding: 16px;
`

export const SubInfo = styled.div`
  ${p => p.theme.fonts.label};
  margin-top: 4px;
  text-align: right;
`

export const DisabledPayout = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const SubTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-top: 30px;
`