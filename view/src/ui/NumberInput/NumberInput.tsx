import React from 'react'
import CSS from 'csstype'

import * as S from './styled'

type Props = {
  icon?: string
  placeholder?: string
  value: string
  onChange: (value: string ) => void
  min?: number
  max?: number
  maxLength?: number
  invalid?: boolean
  className?: string
  style?: CSS.Properties
}

const NumberInput = ({
  icon,
  placeholder,
  value,
  onChange,
  min,
  max,
  maxLength,
  invalid,
  className = '',
  style
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value)
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    let value = currentTarget.value;
    const min = currentTarget.min;
    const max = currentTarget.max;
    if (Number(value) > Number(max)) {
        value = max;
    }

    if (Number(value) < Number(min)) {
        value = min;
    }

    onChange(value);
  }


  return (
    <S.Wrapper invalid={invalid} className={className} style={style}>
      {icon && <img src={icon} alt="Icon" />}
      <input
        type="text"
        placeholder={placeholder}
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        maxLength={maxLength}
        onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
          if (event.currentTarget.value.indexOf('.') !== -1 && event.which === 46) {
              event.preventDefault();
          } else if (event.which !== 46 && (event.which < 48 || event.which > 57)) {
              event.preventDefault();
          }
      }}
      />
    </S.Wrapper>
  )
}

export default NumberInput
