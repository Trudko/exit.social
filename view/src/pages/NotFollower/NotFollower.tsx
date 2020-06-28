import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { Loading, ShareLink } from 'ui'

import * as S from './styled'

type RouteParams = {
  userName: string
}

const NotFollower = () => {
  const params = useParams<RouteParams>()
  const { data, loading } = useQuery<SessionInterface>(SESSION_QUERY)

  return loading ? (
    <Loading />
  ) : (
    <S.Wrapper>
      <S.Title>You are not a follower</S.Title>
      <S.Description>
        Only existing followers can join. Please follow the <a href={`https://www.twitter.com/${params.userName}`}>{params.userName}</a> on Twitter.
      </S.Description>
    </S.Wrapper>
  )
}

export default NotFollower
