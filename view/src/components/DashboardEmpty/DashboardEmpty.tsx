import React from 'react'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  className?: string
  style?: CSS.Properties
}

const DashboardEmpty = ({ className = '', style }: Props) => (
  <S.Wrapper className={className} style={style}>
    <img src="/icons/success.svg" alt="Success" />
    <S.Title>Account successfully connected</S.Title>
    <S.Description>
      Now you need to import your followers to create a database.
    </S.Description>
  </S.Wrapper>
)

export default DashboardEmpty
