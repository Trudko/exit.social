import React, {useState, useEffect} from 'react'
import {TextArea, Button, Checkbox, SuccessIcon} from 'ui'
import {LinkGenerator} from './LinkGenerator';
import { CSSTransition } from 'react-transition-group';

import * as S from './styled'

type StepProps = {
  title: string;
  subTitle: string;
  activeStep: number;
  stepNumber: number;
  children?: React.ReactElement;
}

type Props = {
  handleLastStep: (message: string, allowPayout: boolean) => {};
  shareLink: string;
}

const stepData = [{
    title: 'Your Twitter account has been successfully connected',
    subtitle: 'Set up your account and start building your own community.'
  },{
    title: 'Generate your unique invitation link',
    subtitle: 'Your invitation link is a gate to your new community.'
  } ,{
    title: 'Collect Ethereum addresses',
    subtitle: 'You can ask your followers to provide Ethereum address. You can use it to send ETH or ERC20 tokens to the most active community members.'
  },{
    title: 'Craft custom message for your followers',
    subtitle: 'This message will be shown to anyone who opens your unique invitation link. You can change it later in the settings.'  
}];

const StepContent = ({title, subTitle, activeStep, stepNumber, children}: StepProps) => {
    
    return (
      <CSSTransition
        in={stepNumber <= activeStep}
        classNames="step"
        timeout={600}
        unmountOnExit
      >
        {
          stepNumber <= activeStep ? 
          <S.StepWrapper>
            <S.StepSideLine>
              {
                activeStep === stepNumber ?
                  <S.StepNumberWrapper>
                    <S.StepNumber>{stepNumber}</S.StepNumber>
                  </S.StepNumberWrapper>
                : <SuccessIcon/>

              }
              { activeStep !== stepNumber &&
                <S.DividerWrapper>
                  <S.DividerLine/>
                </S.DividerWrapper>
              }
            </S.StepSideLine>
            <S.StepContent>
              <S.Title>{title}</S.Title>
              <S.SubTitle>{subTitle}</S.SubTitle>
              <S.Actions>
                {children}
              </S.Actions>
            </S.StepContent>
          </S.StepWrapper>
        : <></>
        }
      </CSSTransition>
    );
}

const Onboarding = ({handleLastStep, shareLink}: Props) => {
  const [activeStep, setActiveStep] = useState(2);
  const [allowPayout, setAllowPayout] = useState(true);
  const [messageValid, setMessageValid] = useState(true);
  const [message, setMessage] = useState("");
  const loading = false;

  const handleSubmit = () => {
    const isMessageValid = message.trim().length > 0;
    setMessageValid(isMessageValid);

    if (isMessageValid) {
      handleLastStep(message, allowPayout);
    }
  }

  useEffect(() => {
    const anchor = document.querySelector(`.anchor-${activeStep}`);
    if (anchor) {
      const anchorY = anchor.getBoundingClientRect().top + window.pageYOffset + -10;
      window.scrollTo({top: anchorY, behavior: 'smooth'});
    }

  }, [activeStep]);

  return (
   <S.Wrapper>
      <StepContent
        title={stepData[0].title}
        subTitle={stepData[0].subtitle}
        activeStep={activeStep}
        stepNumber={1}
        />
  
      <StepContent
        title={stepData[1].title}
        subTitle={stepData[1].subtitle}
        activeStep={activeStep}
        stepNumber={2}
      > 
        <LinkGenerator link={shareLink} onLinkGeneration={() => {setActiveStep(activeStep + 1)}}/>
      </StepContent>

      <StepContent
        title={stepData[2].title}
        subTitle={stepData[2].subtitle}
        activeStep={activeStep}
        stepNumber={3}
      > 
        <>
            <Checkbox
              text="Collect Ethereum Address"
              value={allowPayout}
              onChange={selected => {setAllowPayout(!allowPayout)}}
            />
          <S.ActionWrapper>
         
            <Button
              className="anchor-3"
              fluid
              disabled={loading}
              onClick={() => {setActiveStep(activeStep + 1)}}
            >
              Continue
            </Button>
            
          </S.ActionWrapper>
       </>
      </StepContent>

      <StepContent
        title={stepData[3].title}
        subTitle={stepData[3].subtitle}
        activeStep={activeStep}
        stepNumber={4}
      >
        <>
          <S.Form>
            <TextArea
              id="settings-personalMessage"
              placeholder="Craft your message here"
              value={message}
              onChange={e => setMessage(e.target.value)}
              invalid={!messageValid}
            />
          </S.Form>
          
          <Button
            disabled={loading}
            onClick={handleSubmit}
            className="anchor-4"
            >
              {loading ? 'Loading' : 'Save & Continue'}
          </Button>
        </>

      </StepContent>
   </S.Wrapper>
  )
}

export default Onboarding
