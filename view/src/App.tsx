import React from 'react'
import { useDidUpdate } from 'react-hooks-lib'
import { useLocation, useHistory } from 'react-router'
import { Switch, Route } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import routes from 'config/routes'
import { Loading } from 'ui'
import { AuthProvider } from 'contexts'

import 'styles/global.css'

declare global {
  interface Window {
    ethereum: any
    web3: any
    location: Location
  }
}

const App = () => {
  const history = useHistory()
  const { pathname } = useLocation()
  const { data, loading, refetch } = useQuery<SessionInterface>(SESSION_QUERY)

  useDidUpdate(() => {
    refetch()
  }, [pathname])

  useDidUpdate(() => {
    if (!loading) {
      if (
        !pathname.includes('api') &&
        !pathname.includes('follow') &&
        !pathname.includes('leaderboard')
      ) {
        if (data) {
          if (!pathname.includes('settings')) history.replace('/dashboard')
        } else {
          history.replace('/')
        }
      }
    }
  }, [loading])

  return loading ? (
    <Loading />
  ) : (
    <AuthProvider user={data?.session} authenticating={loading}>
      <Switch>
        {routes.map((item, idx) => (
          <Route
            key={`route-${idx}`}
            exact={item.subRoutes.some(o => o.exact)}
            path={item.subRoutes.map(o => o.path)}
          >
            <item.layout>
              {item.subRoutes.map((item2, idx2) => (
                <Route key={`route-${idx}-subroute-${idx2}`} {...item2} />
              ))}
            </item.layout>
          </Route>
        ))}
      </Switch>
    </AuthProvider>
  )
}

export default App
