import React from 'react'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  id?: string
  label?: string
  rows?: number
  placeholder?: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  invalid?: boolean
  className?: string
  disabled?: boolean
  style?: CSS.Properties
}

const TextArea = ({
  id,
  label,
  rows = 10,
  placeholder,
  value,
  onChange,
  invalid,
  className = '',
  disabled = false,
  style
}: Props) => (
  <S.Wrapper className={className} style={style}>
    {label && <S.Label htmlFor={id || ''}>{label}</S.Label>}
    <S.Value invalid={invalid}>
      <textarea
        id={id || ''}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </S.Value>
  </S.Wrapper>
)

export default TextArea
