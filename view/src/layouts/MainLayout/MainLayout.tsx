import React from 'react'
import { useLocation, useHistory } from 'react-router'

import { useMutation } from '@apollo/client'
import SIGNOUT_MUTATION from 'apollo/mutations/signout'

import { HeaderActions } from 'components'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const MainLayout = ({ children }: Props) => {
  const history = useHistory()
  const { pathname } = useLocation()
  const [signOut] = useMutation(SIGNOUT_MUTATION);

  return (
    <S.Wrapper>
      <S.Header>
        <S.Logo
         onClick={() => history.push('/dashboard')}
        >
          exit.social
        </S.Logo>
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
                signOut();
                window.location.href =  window.location.protocol + "//" + window.location.host;
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
