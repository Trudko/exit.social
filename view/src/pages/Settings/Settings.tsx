import React, { useContext, useState, useEffect } from 'react'

import SETTINGS_MUTATION from 'apollo/mutations/settings'
import { AuthContext } from 'contexts'
import { TextArea, Button } from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import { useQuery, useMutation } from '@apollo/client'

import * as S from './styled'

const Settings = () => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')
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
      }
  }
  )

  useEffect(() => {
    if (user?.message) setMessage(user.message)
  }, [user])

  return (
    <S.Wrapper>
        <S.Title>Settings</S.Title>
        <S.Settings>
          { notification.show && <Notification type={notification.type} text="Settings Saved Successfully" />}
          <TextArea
            id="settings-personalMessage"
            label="Personal message"
            placeholder="Message for new followers"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          <Button
            fluid
            disabled={loading}
            onClick={async () => {
              await saveSettings({
                variables: {
                  influencerID: user.username,
                  settingsData: {
                    message: message
                  }
                }
              })
            }}
            >
              {loading ? 'Loading' : 'Save'}
          </Button>
        </S.Settings>
    </S.Wrapper>
  )
}

export default Settings
