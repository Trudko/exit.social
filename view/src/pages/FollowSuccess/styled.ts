import styled from 'styled-components'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`

export const Title = styled.div`
  ${p => p.theme.fonts.h1};

  margin-bottom: 16px;
`

export const Description = styled.div`
  ${p => p.theme.fonts.p1};

  width: 480px;
  margin-bottom: 40px;
  text-align: center;
`

export const Label = styled.div`
  ${p => p.theme.fonts.label};

  margin-bottom: 16px;
  text-transform: uppercase;
`
