import React, { useRef } from 'react'
import { useQuery } from '@apollo/client'
import CSS from 'csstype'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { Button } from 'ui'

import * as S from './styled'

type Props = {
  label?: string
  withButton?: boolean
  value?: string
  link?: string
  className?: string
  style?: CSS.Properties
}

const ShareLink = ({
  label,
  withButton,
  value,
  link,
  className = '',
  style
}: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { data, loading } = useQuery<SessionInterface>(SESSION_QUERY)

  const handleCopy = () => {
    if (inputRef?.current) {
      inputRef.current.select()
      document.execCommand('copy')
    }
  }

  return (
    <S.Wrapper className={className} style={style}>
      {label && <S.Label>{label}</S.Label>}
      {!loading && (
        <S.Value>
          <input
            readOnly
            ref={inputRef}
            type="text"
            value={
              value ||
              (data?.session?.username
                ? `${window.location.protocol}//${window.location.host}/follow/${data.session.username}`
                : 'Something went wrong :(')
            }
          />
          <button onClick={handleCopy}>Copy to clipboard</button>
        </S.Value>
      )}
      {withButton && (
        <Button
          outsideRedirect
          openNewTab
          to={
            link ||
            `https://twitter.com/intent/tweet${
              data?.session?.username
                ? `?text=Hey%20everyone!%20Sign%20up%20for%20${window.location.protocol}//${window.location.host}/follow/${data.session.username}%20if%20you%20want%20to%20support%20me.`
                : ''
            }`
          }
        >
          <img src="/icons/twitter.svg" alt="Twitter" />
          Share on Twitter
        </Button>
      )}
    </S.Wrapper>
  )
}

export default ShareLink
