import React from 'react'
import { useParams} from 'react-router'
import { Link} from 'react-router-dom'
import { useQuery } from '@apollo/client'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { Loading, ShareLink } from 'ui'

import * as S from './styled'

type RouteParams = {
  userName: string
}

const FollowSuccess = () => {
  const params = useParams<RouteParams>()
  const { data, loading } = useQuery<SessionInterface>(SESSION_QUERY)

  return loading ? (
    <Loading />
  ) : (
    <S.Wrapper>
      <S.Title>Help influencer share their message</S.Title>
      <S.Description>
        Welcome to the community. Grab your link and earn points! You can see the best members of our 
        <Link to={`/${params.userName}/leaderboard`}> community here</Link>
        
  
      </S.Description>
      <S.Label>Your Invite link</S.Label>
      <ShareLink
        withButton
        value={`${window.location.protocol}//${window.location.host}/follow/${params.userName}?ref=${data?.session?.username}`}
        link={`https://twitter.com/intent/tweet?text=By%20sharing%20this%20link%20you%20will%20help%20the%20influencer%20to%20migrate%20to%20a%20new%20platform%20with%20new%20%26%20fresh content.%20${window.location.protocol}//${window.location.host}/follow/${params.userName}?ref=${data?.session?.username}`}
      />
    </S.Wrapper>
  )
}

export default FollowSuccess
