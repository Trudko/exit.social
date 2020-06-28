import styled from 'styled-components'

import { colors } from 'styles/variables'

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
`

export const Header = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    color: ${p => p.color || colors.primary};

    font-size: 20px;
    font-weight: 800;
  }
`

export const Content = styled.div`
  flex-grow: 1;
`
