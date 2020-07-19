import React, { useContext, useState } from 'react'
import CSS from 'csstype'

import { AuthContext } from 'contexts'
import {ShareLink, TextArea, Button } from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import {useMutation } from '@apollo/client'
import SETTINGS_MUTATION from 'apollo/mutations/settings'

import * as S from './styled'

type Props = {
  description: string
  className?: string
  style?: CSS.Properties
}

const DashboardEmpty = ({ description, className = '', style }: Props) => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')
  const [messageSaved, setMessageSaved] = useState<boolean>(false)
  const [messageValid, setMessageValid] = useState<boolean>(true)
  const [notification, setNotification] = useState({
    show: false,
    type: NotificationType.Success
  });

  const [saveSettings, {loading}] = useMutation(
    SETTINGS_MUTATION,
    {
      onCompleted() {
        setNotification({
          show: true,
          type: NotificationType.Success
        });
        setMessageSaved(true)
      }
  });

  const saveMessage = async () => {
    const isMessageValid = message.trim().length > 0;
    console.log(isMessageValid)
    setMessageValid(isMessageValid);

    if (isMessageValid) {
      await saveSettings({
        variables: {
          influencerID: user.username,
          settingsData: {
            message: message,
            onboarded: true
          }
        }
      })
    }
  }

  return (
    <S.Wrapper className={className} style={style}>
      {notification.show && <Notification type={notification.type} text="Message was saved" />}
     
      <S.Description>
        { !user.onboarded && !messageSaved ? 
          <> 
            <img src="/icons/success.svg" alt="Success" />
            <S.Title>Account successfully connected</S.Title>
            <S.SubTitle>Set message for your followers. You can changed it later in the settings.</S.SubTitle>
            <TextArea
              id="settings-personalMessage"
              placeholder="This message will be shown to anyone who opens your invite link. Explain why they should give you email address."
              value={message}
              onChange={e => setMessage(e.target.value)}
              invalid={!messageValid}
            />
            <Button
                fluid
                disabled={loading}
                onClick={saveMessage}
                >
                  {loading ? 'Loading' : 'Save'}
              </Button>
          </>
        :
          <>
            <S.Title>You have 0 followers</S.Title>
            <S.SubTitle>{description}</S.SubTitle>
              <S.LinkWrapper>
                <ShareLink withButton label="Share your invite link" />
            </S.LinkWrapper>
          </>
        }
       
      </S.Description>
    </S.Wrapper>
  )
}

export default DashboardEmpty
