import React from 'react'
import SVG from 'react-inlinesvg'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  icon?: string
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  invalid?: boolean
  className?: string
  style?: CSS.Properties
}

const Input = ({
  icon,
  placeholder,
  value,
  onChange,
  invalid,
  className = '',
  style
}: Props) => (
  <S.Wrapper invalid={invalid} className={className} style={style}>
    {icon && (
      <SVG src={icon}>
        <img src={icon} alt="Icon" />
      </SVG>
    )}
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </S.Wrapper>
)

export default Input
