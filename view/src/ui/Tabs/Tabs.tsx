import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import CSS from 'csstype'

import * as S from './styled'

type Tab = {
  text: string
  href: string
}

type Props = {
  id: string
  items: Tab[]
  className?: string
  style?: CSS.Properties
}

const Tabs = ({ id, items, className = '', style }: Props) => {
  const { pathname } = useLocation()
  const [activeTab, setActiveTab] = useState<number>(0)

  useEffect(() => {
    setActiveTab(items.findIndex(item => item.href === pathname))
  }, [items, pathname])

  return (
    <S.Wrapper className={className} style={style}>
      {items.map((item, idx) => (
        <S.Tab
          key={`tabs-${id}-item-${idx}`}
          to={item.href}
          active={activeTab === idx ? 1 : 0}
        >
          {item.text}
        </S.Tab>
      ))}
    </S.Wrapper>
  )
}

export default Tabs
