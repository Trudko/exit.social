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

  return (
    <S.Wrapper>
      <S.Header>
        <strong>exit.social</strong>
        <S.NavigationItems>
          <S.NavigationItem
            active={pathname === '/dashboard'}
            onClick={() => history.push('/dashboard')}
          >
            My followers
          </S.NavigationItem>
          <S.NavigationItem
            active={pathname === '/payout'}
            onClick={() => history.push('/payout')}
          >
            Rewards payout
          </S.NavigationItem>
        </S.NavigationItems>
        <HeaderActions
          items={[
            {
              icon: '/icons/settings.svg',
              text: 'Settings',
              onClick: () => history.push('/settings')
            }, {
              icon: '/icons/log-off.svg',
              text: 'Signout',
              onClick: async () =>  {
              
              }
            }
          ]}
        />
      </S.Header>
      {children}
    </S.Wrapper>
  )
}

export default MainLayout
