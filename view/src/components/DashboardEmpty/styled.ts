import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center; 
  padding-top: 150px;


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

export const SubTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-bottom: 32px;
  margin-top: 32px;
  text-align: center;
  width: 450px;
`

export const Description = styled.div`
  ${p => p.theme.fonts.p1};
  margin-bottom: 56px;
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  textarea {
    max-width: 100%;
    width: 450px;
  }

  > button {
    margin-top: 24px;
    width: 450px;
  }
`
export const LinkWrapper = styled.div`
  display: flex;
`;
