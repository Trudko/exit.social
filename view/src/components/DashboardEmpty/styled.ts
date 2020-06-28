import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 56px;
    height: 56px;
    margin-bottom: 24px;
  }
`

export const Title = styled.div`
  ${p => p.theme.fonts.h2};

  width: 400px;
  margin-bottom: 8px;
  text-align: center;
`

export const Description = styled.div`
  ${p => p.theme.fonts.p1};

  width: 400px;
  margin-bottom: 56px;
  text-align: center;
`
