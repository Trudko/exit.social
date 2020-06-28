import React from 'react'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  color?: string
  className?: string
  style?: CSS.Properties
}

const Loading = ({ color, className = '', style }: Props) => (
  <S.Wrapper>
    <S.Spinner
      width="60px"
      height="60px"
      color={color}
      className={className}
      style={style}
    >
      <circle cx="30" cy="30" r="26" fill="transparent" strokeWidth="8" />
    </S.Spinner>
  </S.Wrapper>
)

export default Loading
