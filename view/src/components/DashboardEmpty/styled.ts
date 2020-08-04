import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.div`
  padding: 40px 16px;

  @media ${mediaQueries.laptop} {
    padding: 40px 24px;
  }

  > img {
    width: 56px;
    height: 56px;
    margin-bottom: 24px;
  }

  > button {
    font-size: 14px;
  }
`

export const Title = styled.div`
  ${p => p.theme.fonts.h2};
  margin-top: 30px;
  text-align: center;
`

export const GrayTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-top: 30px;
  margin-bottom: 32px;
  text-align: center;
  color: ${p => p.theme.colors.darkGray};
  font-weight: bold;
`

export const SubTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-bottom: 32px;
  margin-top: 16px;
  text-align: center;
  width: 100%;
  
  @media ${mediaQueries.laptop} {
    width: 500px;
  }
`

export const ZeroFollowers = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  ${p => p.theme.fonts.p1};
  margin-bottom: 56px;
  text-align: center;
  position: relative;
  width: 100%;
  
  input[type=checkbox], .label {
    margin-top: 38px;
  }

  > button {
    margin-top: 38px;
    width: 214px;
    height: 48px;
  }
`
export const LinkWrapper = styled.div`
  display: flex;
  width: 100%;
`;

