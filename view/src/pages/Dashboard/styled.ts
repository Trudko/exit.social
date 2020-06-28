import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  background: ${p => p.theme.colors.softGray};
  position: relative;
`

export const Content = styled.div`
  padding: 16px 24px;
`
