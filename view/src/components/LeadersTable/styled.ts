import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 800px;
`

export const PositionWrapper = styled.div`
  position: relative;
  height: 32px;
`

export const Position = styled.div<{top: boolean}>`
  ${p => p.theme.fonts.text6};
  font-weight: ${p => p.top ? "bold" : "normal"};
  position: absolute;
  top: 50%;
  left: 20px;
  transform: translate(-50%, -50%);
`

export const BadgeWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 2px;
`
