import React, { useContext, useState } from 'react'
import CSS from 'csstype'

import { AuthContext } from 'contexts'
import {ShareLink, TextArea, Button, Checkbox} from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import {useMutation } from '@apollo/client'
import SETTINGS_MUTATION from 'apollo/mutations/settings'
import {SuccessIcon} from "ui";

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
  const [allowPayout, setAllowPayout] = useState<boolean>(true)
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
    setMessageValid(isMessageValid);

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
     
      <S.Description>
        { !user.onboarded && !messageSaved ? 
          <> 
            <SuccessIcon/>
            <S.Title>Account successfully connected</S.Title>
            <S.SubTitle>Set a message for your followers that will be shown to anyone who opens your unique invite link. You can change it later in the settings.</S.SubTitle>
            <TextArea
              id="settings-personalMessage"
              placeholder="Craft your message here"
              value={message}
              onChange={e => setMessage(e.target.value)}
              invalid={!messageValid}
            />
            <Checkbox
              text="Collect Ethereum Address for payouts"
              value={allowPayout}
              onChange={selected => setAllowPayout(!allowPayout)}
            />
            <Button
                fluid
                disabled={loading}
                onClick={saveMessage}
                >
                  {loading ? 'Loading' : 'Save invite message'}
              </Button>
          </>
        :
          <>
            <img src="/icons/followers.svg" alt="Success" />
            <S.GrayTitle>You have 0 followers on this account</S.GrayTitle>
              <S.LinkWrapper>
                <ShareLink withButton label="SHARE YOUR INVITE LINK" columnOrientation={true} />
            </S.LinkWrapper>
          </>
        }
       
      </S.Description>
    </S.Wrapper>
  )
}

export default DashboardEmpty
