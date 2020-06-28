import React from 'react'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  text?: string
  value: boolean
  onChange: (value: boolean) => void
  disabled?: boolean
  className?: string
  style?: CSS.Properties
}

const Checkbox = ({
  text,
  value,
  onChange,
  disabled = false,
  className = '',
  style
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  const toggleSelection = () => !disabled &&  onChange(!value)

  return (
    <S.Wrapper
      checked={value}
      className={className}
      style={style}
      onClick={disabled ? undefined : toggleSelection}
      disabled={disabled}
    >
      <input type="checkbox" checked={value} onChange={handleChange} disabled={disabled}/>
      <span className="label">{text}</span>
    </S.Wrapper>
  )
}

export default Checkbox
