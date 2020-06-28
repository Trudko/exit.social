import React from 'react'
import { useLocation, useHistory } from 'react-router'

import { HeaderActions } from 'components'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const MainLayout = ({ children }: Props) => {
  const history = useHistory()
  const { pathname } = useLocation()

  console.log(pathname)

  return (
    <S.Wrapper>
      <S.Header>
        <strong>exit.social</strong>
        <S.NavigationItems>
          <S.NavigationItem active={pathname === '/dashboard'} onClick={() => history.push('/dashboard')}>
            My followers
          </S.NavigationItem>
          <S.NavigationItem active={pathname === '/payout'} onClick={() => history.push('/payout')}>
            Rewards payout
          </S.NavigationItem>
        </S.NavigationItems>
        <HeaderActions/>
      </S.Header>
      {children}
    </S.Wrapper>
  )
}

export default MainLayout
