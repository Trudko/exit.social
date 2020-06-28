import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'

import LEADERBOARD_QUERY from 'apollo/queries/leaderboard'
import { LeaderboardInterface } from 'types/leaderboard'
import { Input, Loading } from 'ui'
import { LeadersTable } from 'components'

import * as S from './styled'

type RouteParams = {
  username: string
}

const Leaderboard = () => {
  const params = useParams<RouteParams>()
  const { data, loading } = useQuery<LeaderboardInterface>(LEADERBOARD_QUERY, {
    variables: {
      influencerID: params.username
    }
  })
  const [searchQuery, setSearchQuery] = useState<string>('')

  const toLeader = (follower, index) => ({
    ...follower,
    position: index + 1
  })

  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <S.Title>Supporters leaderboard</S.Title>
          <S.SubTitle>
            Help your influencer move to another platform and get rewards
          </S.SubTitle>
          <S.SearchInputWrapper>
            <Input
              icon="/icons/search.svg"
              placeholder="Search your Twitter handle"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </S.SearchInputWrapper>
          <LeadersTable
            tableData={data?.leaderboard?.followers.map(toLeader)}
            searchQuery={searchQuery}
          />
        </>
      )}
    </S.Wrapper>
  )
}

export default Leaderboard
