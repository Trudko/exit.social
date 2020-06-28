import React, { useRef, useState } from 'react'
import { useQuery } from '@apollo/client'
import CSS from 'csstype'

import SESSION_QUERY from 'apollo/queries/session'
import { SessionInterface } from 'types/users'
import { useOutsideClick } from 'hooks'

import * as S from './styled'

type Props = {
  className?: string
  style?: CSS.Properties
}

const HeaderActions = ({ className = '', style }: Props) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const { data, loading } = useQuery<SessionInterface>(SESSION_QUERY)

  useOutsideClick(ref, () => setDropdownVisible(false))

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
        
        </S.Dropdown>
      )}
    </S.Wrapper>
  )
}

export default HeaderActions
