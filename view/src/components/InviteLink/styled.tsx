import styled from 'styled-components'
import mediaQueries from "utils/mediaQueries";

export const Share = styled.div`
  width: 100%;
  display: flex;
 
  @media ${mediaQueries.laptop} {
    position: relative;
    width: 1px;
    height: 40px;
  }
`

export const ShareItem = styled.div<{
  visible?: boolean
  }>`

  width: 100%;
  display: flex;
  justify-content: center;

  @media ${mediaQueries.laptop} {
    position: absolute;
    top: 0;
    right: 0;
    width: auto;
  }

  opacity: ${p => !p.visible && '0'};
  visibility: ${p => !p.visible && 'hidden'};
  position: ${p => !p.visible && 'absolute'};
  transition: visibility 0s, opacity 0.6s;
  pointer-events: ${p => !p.visible && 'none'};

  * {
    white-space: nowrap;
  }

  button {
    span {
      margin-left: 10px;
    }
  }
`