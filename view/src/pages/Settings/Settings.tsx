import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from 'contexts'
import { TextArea, Button } from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import SETTINGS_MUTATION from 'apollo/mutations/settings'
import {useMutation } from '@apollo/client'

import * as S from './styled'

const Settings = () => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')
  const [formChanged, setFormChanged] = useState<boolean>(false)
  const [notification, setNotification] = useState({
    show: false,
    type: NotificationType.Success,
    id: message
  });

  const [saveSettings, {loading}] = useMutation(
    SETTINGS_MUTATION,
    {
      onCompleted() {
        setNotification({
          show: true,
          type: NotificationType.Success,
          id: message
        });

        setFormChanged(false);
      }
  });


  useEffect(() => {
    if (user?.message) setMessage(user.message)
  }, [user])

  return (
    <S.Wrapper>
        { notification.show && <Notification type={notification.type} id={notification.id} text="Settings was saved" onClose={() => setNotification({...notification, show: false})} />}
        <S.Title>Settings</S.Title>
        <S.Settings>
          <TextArea
            id="settings-personalMessage"
            label="Message for your followers"
            placeholder="Craft your message here"
            value={message}
            onChange={e => {setFormChanged(true); setMessage(e.target.value)}}
            disabled={loading}
          />
          <Button
            fluid
            disabled={!formChanged || loading}
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
              {loading ? 'Loading' : 'Save invite message'}
          </Button>
        </S.Settings>
    </S.Wrapper>
  )
}

export default Settings
