import React, { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import CSS from 'csstype'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { useOutsideClick } from 'hooks'

import * as S from './styled'

type HeaderAction = {
  icon?: string
  text?: string
  onClick?: () => void
}

type Props = {
  items?: HeaderAction[]
  className?: string
  style?: CSS.Properties
}

const HeaderActions = ({ items, className = '', style }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const { data, loading } = useQuery<SessionInterface>(SESSION_QUERY)

  useOutsideClick(ref, () => setDropdownVisible(false))

  const handleOnClick = (fn: () => void) => {
    if (fn) fn()
    setDropdownVisible(false)
  }

  return loading ? (
    <div>Loading...</div>
  ) : (
    <S.Wrapper ref={ref} className={className} style={style}>
      <S.Button onClick={() => setDropdownVisible(!dropdownVisible)}>
        @{data?.session?.username || 'Unknown'}
        {data?.session?.photoURL && (
          <S.ProfilePicture src={data.session.photoURL} />
        )}
      </S.Button>
      {dropdownVisible && (
        <S.Dropdown>
          {items?.map((item, idx) => (
            <S.DropdownItem
              key={`headerAction-${idx}`}
              onClick={() => handleOnClick(item.onClick)}
            >
              {item.icon && <img src={item.icon} alt={item.text} />}
              {item.text}
            </S.DropdownItem>
          ))}
        </S.Dropdown>
      )}
    </S.Wrapper>
  )
}

export default HeaderActions
