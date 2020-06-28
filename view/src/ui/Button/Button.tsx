import React from 'react'
import { useHistory } from 'react-router-dom'
import CSS from 'csstype'

import * as S from './styled'

export const ButtonThemes = ['primary', 'secondary'] as const

type ButtonType = 'button' | 'submit' | 'reset' | undefined

export type Theme = typeof ButtonThemes[number]

type Props = {
  type?: ButtonType
  buttonTheme?: Theme
  disabled?: boolean
  onClick?: () => void
  to?: string
  outsideRedirect?: boolean
  openNewTab?: boolean
  children: React.ReactNode[] | React.ReactNode | string
  className?: string
  style?: CSS.Properties
}

const Button = ({
  type,
  buttonTheme = 'primary',
  disabled,
  onClick,
  to,
  outsideRedirect,
  openNewTab,
  children,
  className = '',
  style
}: Props) => {
  const history = useHistory()

  const handleOnClick = () => {
    if (onClick) {
      onClick()
    } else if (to) {
      if (outsideRedirect) {
        if (openNewTab) {
          window.open(to, '_blank', 'noopener noreferrer')
        } else {
          window.location.href = to
        }
      } else {
        history.push(to)
      }
    }
  }

  return (
    <S.Wrapper
      type={type}
      buttonTheme={ButtonThemes.includes(buttonTheme) ? buttonTheme : 'primary'}
      disabled={disabled}
      onClick={handleOnClick}
      className={className}
      style={style}
    >
      {children}
    </S.Wrapper>
  )
}

export default Button
