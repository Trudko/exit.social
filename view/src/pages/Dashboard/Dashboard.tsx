import React from 'react'
import { useQuery } from '@apollo/client'

import FOLLOWERS_QUERY from 'apollo/queries/followers'
import { FollowersInterface } from 'types/followers'
import { DashboardStats, DashboardContent, DashboardEmpty } from 'components'
import { Loading } from 'ui'

import * as S from './styled'

const Dashboard = () => {
  const { data, loading } = useQuery<FollowersInterface>(FOLLOWERS_QUERY)

  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
     
          data.followers.values.length === 0 ?
            <DashboardEmpty
              description="You'll see information about your followers here."
            />
          :
            <>
              <DashboardStats data={data} />
              <DashboardContent data={data} />
            </>
    
      )}
    </S.Wrapper>
  )
}

export default Dashboard
