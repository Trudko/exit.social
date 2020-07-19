import React, { useState } from 'react'
import CSS from 'csstype'

import { FollowersInterface } from 'types/followers'
import { Button } from 'ui'
import {InviteLink} from "components";

import * as S from './styled'

type Props = {
  data?: FollowersInterface
  className?: string
  style?: CSS.Properties
}

const DashboardStats = ({ data, className = '', style }: Props) => {
  const [shareLinkVisible, setShareLinkVisible] = useState<boolean>(false)

  return (
    <S.Wrapper className={className} style={style}>
      <S.Inner>
        <S.Card>
          <span>Total followers</span>
          <strong>{data?.followers?.total || 0}</strong>
        </S.Card>
        <S.Card>
          <span>Converted</span>
          <strong>
            {data?.followers?.values?.length ||
              0 / data?.followers?.total ||
              0 ||
              0}{' '}
            <span>%</span>
            <small>{data?.followers?.values?.length || 0} Followers</small>
          </strong>
        </S.Card>
      </S.Inner>
      <InviteLink/>
    </S.Wrapper>
  )
}

export default DashboardStats
