import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'

import LEADERBOARD_QUERY from 'apollo/queries/leaderboard'
import { LeaderboardInterface } from 'types/leaderboard'
import { Input, Loading, InfluencerPicture} from 'ui'
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
          {data?.leaderboard?.influencer?.photoURL && (
            <InfluencerPicture src={data?.leaderboard?.influencer.photoURL}/>
          )}
          <S.Title>Supporters leaderboard</S.Title>
          <S.SubTitle>
            Top community members
          </S.SubTitle>
          <S.SearchInputWrapper>
            <Input
              icon="/icons/search.svg"
              placeholder="Search By Twitter handle"
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
