import React, { useContext, useState } from 'react'
import CSS from 'csstype'

import { AuthContext } from 'contexts'
import {ShareLink} from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import {useMutation } from '@apollo/client'
import SETTINGS_MUTATION from 'apollo/mutations/settings'
import Onboarding from "./Onboarding";

import * as S from './styled'

type Props = {
  description: string
  className?: string
  style?: CSS.Properties
}

const DashboardEmpty = ({ description, className = '', style }: Props) => {
  const { user } = useContext(AuthContext)
  const [onboardingFinished, setOnboardingFinished] = useState(user.onboarded);
  const [notification, setNotification] = useState({
    show: false,
    type: NotificationType.Success
  });

  const [saveSettings] = useMutation(
    SETTINGS_MUTATION,
    {
      onCompleted() {
        setNotification({
          show: true,
          type: NotificationType.Success
        });
        setOnboardingFinished(true);
      }
  });
 
  const saveMessage = async (message: string, allowPayout: boolean) => {
    const isMessageValid = message.trim().length > 0;

    if (isMessageValid) {
      await saveSettings({
        variables: {
          influencerID: user.username,
          settingsData: {
            message: message,
            onboarded: true,
            allowPayout: allowPayout
          }
        }
      })
    }
  }


  return (
    <S.Wrapper className={className} style={style}>
      {notification.show && <Notification type={notification.type} text="Message was saved" />}

      
        { !onboardingFinished ?
          <> 
            <Onboarding 
              handleLastStep={saveMessage}
              shareLink={`${window.location.protocol}//${window.location.host}${process.env.REACT_APP_VIEW_BASE_URL}/follow/${user.username}`}
            />
          </>
        :
        <S.ZeroFollowers>
            <img src="/icons/followers.svg" alt="Success" />
            <S.GrayTitle>You have 0 followers on this account</S.GrayTitle>
              <S.LinkWrapper>
                <ShareLink withButton label="SHARE YOUR INVITE LINK" columnOrientation={true} />
            </S.LinkWrapper>
         </S.ZeroFollowers>
        }
       
    
    </S.Wrapper>
  )
}

export default DashboardEmpty
