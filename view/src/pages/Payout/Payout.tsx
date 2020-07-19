import React, { useContext, useMemo, useState } from 'react'

import {PayoutContent, DashboardEmpty} from "components";
import { useQuery } from '@apollo/client'
import FOLLOWERS_QUERY from 'apollo/queries/followers'
import { FollowersInterface } from 'types/followers'
import { Loading } from 'ui'

import * as S from './styled'

const Payout = () => {
  const { data, loading } = useQuery<FollowersInterface>(FOLLOWERS_QUERY)

  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
     
          data.followers.values.length === 0 ?
            <DashboardEmpty 
              description="You'll will be able to reward your followers through metamask here."
            />
          :
            <PayoutContent/>
        )}
    </S.Wrapper>
  )
}


export default Payout
