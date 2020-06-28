import { EmptyLayout, MainLayout, TryAppLayout } from 'layouts'
import {
  SignIn,
  Dashboard,
  Follow,
  FollowSuccess,
  Leaderboard,
  NotFollower,
  Payout
} from 'pages'

export default [
  {
    layout: EmptyLayout,
    subRoutes: [
      {
        path: '/',
        exact: true,
        component: SignIn
      },
      {
        path: '/follow/:userName',
        exact: true,
        component: Follow
      },
      {
        path: '/follow/:userName/success',
        exact: true,
        component: FollowSuccess
      },
      {
        path: '/follow/:userName/notFollower',
        exact: true,
        component: NotFollower
      },
      {
        path: '/follow/:userName/alreadyFollower',
        exact: true,
        component: FollowSuccess
      }
    ]
  },
  {
    layout: MainLayout,
    subRoutes: [
      {
        path: '/dashboard',
        exact: true,
        component: Dashboard
      },
      {
        path: '/payout',
        exact: true,
        component: Payout
      }
    ]
  },
  {
    layout: TryAppLayout,
    subRoutes: [
      {
        path: '/:username/leaderboard',
        exact: true,
        component: Leaderboard
      }
    ]
  }
]
