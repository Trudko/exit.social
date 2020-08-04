import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.div`
  min-height: 100vh;
  padding: 104px 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${mediaQueries.laptop} { 
    padding: 104px 48px;
  }
`
