import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; 
  justify-content: center;
  width: 100%;
  padding: 16px;

  .step-enter {
    opacity: 0;
    transform: scale(0.9);
  }

  .step-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 600ms, transform 600ms;
  }

  .step-exit {
    opacity: 1;
  }
  
  .step-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 600ms, transform 600ms;
  }
`

export const DividerWrapper = styled.div`
  height: 100%;
`

export const DividerLine = styled.div`
  margin: 16px auto;
  border: 1px solid;
  border-color: ${p => p.theme.colors.lightGray};
  width: 1px;
  height: calc(100% - 74px);
`;

export const Actions = styled.div``;

export const StepWrapper = styled.div`
  display: flex;
  width: 360px;

  @media ${mediaQueries.laptop} {
      width: initial;
    }

  textarea {
    width: 240px;
    width: 100%;

    @media ${mediaQueries.laptop} {
      width: 560px;
    }
  }
`;

export const StepNumberWrapper = styled.div`
  margin-right: 16px;

  svg {
    height: 32px;
  }
  
  @media ${mediaQueries.laptop} {
    margin-right: 32px;
  }
`;

export const StepContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;
`;

export const SubTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-bottom: 32px;
  margin-top: 16px;
  width: 100%;
  text-align: left;
`
export const Title = styled.div`
  ${p => p.theme.fonts.h2};
  font-weight: initial;
  text-align: left;
`

export const GrayTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-top: 30px;
  margin-bottom: 32px;
  color: ${p => p.theme.colors.darkGray};
  font-weight: bold;
`

export const StepNumber = styled.div`
  background-color: ${p => p.theme.colors.primary};  
  border-radius: 50%;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 32px;
  width: 32px;
`

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 32px 0px;

  button {
    width: 180px;
  }
`

export const LinkText = styled.div`
  margin-left: 10px;
`

export const ValueWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${p => p.theme.colors.primary};  
  font-weight: bold;

  svg {
    height: 16px;
  }
`

export const Value = styled.div`
  width: 100%;
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
    color: ${p => p.theme.colors.black};
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
    padding: 10px 16px;
  }
`

export const Form = styled.div`
  margin-bottom: 32px;
`;

export const LinkGeneratorWrapper = styled.div`
  margin-bottom: 32px;
`;