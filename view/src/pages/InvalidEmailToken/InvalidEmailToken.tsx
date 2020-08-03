import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { Loading, Button } from 'ui'

import * as S from './styled'

type RouteParams = {
  userName: string
}

const InvalidEmailToken = () => {
  const params = useParams<RouteParams>()
  const { loading } = useQuery<SessionInterface>(SESSION_QUERY)

  return loading ? (
    <Loading />
  ) : (
    <S.Wrapper>
      <S.Title>Email Token Invalid</S.Title>
      <S.Description>
        Don't worry! Please try again or <a href="mailto:hello@exit.social?subject=Invalid Token">contact us</a>
        <a
          href={`https://www.twitter.com/${params.userName}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          @{params.userName} 
        </a>
        on Twitter.
      </S.Description>
      <Button to={`/follow/${params.userName}`}>Try again</Button>
    </S.Wrapper>
  )
}

export default InvalidEmailToken
