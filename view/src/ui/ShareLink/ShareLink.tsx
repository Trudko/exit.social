import React, { useRef } from 'react'

import { useQuery } from '@apollo/client'
import CSS from 'csstype'
import SESSION_QUERY from 'apollo/queries/session'
import { Button, ShareTwitterIcon, ShareTwitterMobileIcon } from 'ui'
import { useMediaQuery } from 'react-responsive'
import mediaQueries from "utils/mediaQueries";
import { SessionInterface } from 'types/users'

import * as S from './styled'

type Props = {
  label?: string
  withButton?: boolean
  value?: string
  link?: string
  className?: string
  columnOrientation?: boolean,
  style?: CSS.Properties
}

const ShareLink = ({
  label,
  withButton,
  value,
  link,
  className = '',
  columnOrientation = false,
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

  const isMobile = !useMediaQuery({ query: mediaQueries.laptop })

  return (
    <S.Wrapper className={className} style={style} columnOrientation={columnOrientation}>
      {label && !isMobile && <S.Label columnOrientation={columnOrientation}>{label}</S.Label>}
      {!loading && (
        <S.Value columnOrientation={columnOrientation}>
          <input
            readOnly
            ref={inputRef}
            type="text"
            value={
              value ||
              (data?.session?.username
                ? `${window.location.protocol}//${window.location.host}${process.env.REACT_APP_VIEW_BASE_URL}/follow/${data.session.username}`
                : 'Something went wrong :(')
            }
          />
          <button onClick={handleCopy}>Copy to clipboard</button>
        </S.Value>
      )}
      {withButton && (
        <Button
          externalRedirect
          openNewTab
          to={
            link ||
            `https://twitter.com/intent/tweet${
              data?.session?.username
                ? `?text=Hey%20everyone!%20Sign%20up%20for%20${window.location.protocol}//${window.location.host}${process.env.REACT_APP_VIEW_BASE_URL}/follow/${data.session.username}%20if%20you%20want%20to%20support%20me.`
                : ''
            }`
          }
        >
          { isMobile ? <ShareTwitterMobileIcon/> : <> <ShareTwitterIcon/>  <S.ShareText>Share On Twitter</S.ShareText> </>}
        </Button>
      )}
    </S.Wrapper>
  )
}

export default ShareLink
