import React from 'react'

import { Button } from 'ui'

import * as S from './styled'

const SignIn = () => {
  return (
    <S.Wrapper>
      <S.Title>exit.social</S.Title>
      <S.Description>
        Welcome to Exit Social - Exit Portal for social networks.
      </S.Description>
      <Button
        externalRedirect
        to={`${process.env.REACT_APP_API_URL}/auth/twitter`}
      >
        <img src="/icons/twitter.svg" alt="Twitter" />
        Sign In Via Twitter
      </Button>
    </S.Wrapper>
  )
}

export default SignIn
