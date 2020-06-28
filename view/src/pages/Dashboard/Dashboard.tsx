import React from 'react'
import { useQuery } from '@apollo/client'

import FOLLOWERS_QUERY from 'apollo/queries/followers'
import { FollowersInterface } from 'types/followers'
import { DashboardStats, DashboardContent } from 'components'
import { Loading } from 'ui'

import * as S from './styled'

const Dashboard = () => {
  const { data, loading } = useQuery<FollowersInterface>(FOLLOWERS_QUERY)

  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          <DashboardStats data={data} />
          <DashboardContent data={data} />
        </>
      )}
    </S.Wrapper>
  )
}

export default Dashboard
