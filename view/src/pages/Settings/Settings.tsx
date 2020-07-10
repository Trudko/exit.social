import React, { useContext, useState, useEffect } from 'react'

import { AuthContext } from 'contexts'
import { TextArea, Button } from 'ui'

import * as S from './styled'

const Settings = () => {
  const { user } = useContext(AuthContext)
  const [message, setMessage] = useState<string>('')

  useEffect(() => {
    if (user?.message) setMessage(user.message)
  }, [user])

  return (
    <S.Wrapper>
      <div>
        <TextArea
          id="settings-personalMessage"
          label="Personal message"
          placeholder="Message for new followers"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <Button fluid>Save</Button>
      </div>
    </S.Wrapper>
  )
}

export default Settings
