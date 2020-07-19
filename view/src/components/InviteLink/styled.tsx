import styled from 'styled-components'

export const Share = styled.div`
  width: 1px;
  height: 40px;
  position: relative;
`

export const ShareItem = styled.div<{
  visible?: boolean
  }>`
  opacity: ${p => !p.visible && '0'};
  transition: opacity 0.6s;
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: ${p => !p.visible && 'none'};

  * {
    white-space: nowrap;
  }
`