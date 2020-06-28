import React from 'react'

import { Footer } from 'ui'

import * as S from './styled'

type Props = {
  children: React.ReactNode[] | React.ReactNode | string
}

const EmptyLayout = ({ children }: Props) => (
  <S.Wrapper>
    {children}
    <Footer />
  </S.Wrapper>
)

export default EmptyLayout
