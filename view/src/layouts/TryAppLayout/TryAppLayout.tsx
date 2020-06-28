import React from 'react'

import { Button, Footer } from 'ui'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const TryAppLayout = ({ children }: Props) => (
  <S.Wrapper>
    <S.Header>
      <strong>exit.social</strong>
      <Button to="/">Try exit.social</Button>
    </S.Header>
    <S.Content>{children}</S.Content>
    <Footer />
  </S.Wrapper>
)

export default TryAppLayout
