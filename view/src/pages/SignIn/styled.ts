import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Title = styled.div`
  ${p => p.theme.fonts.h1};

  margin-bottom: 32px;
`

export const Description = styled.div`
  ${p => p.theme.fonts.p1};

  width: 480px;
  margin-bottom: 56px;
  text-align: center;
`
