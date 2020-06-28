import styled, { keyframes } from 'styled-components'

import { colors } from 'styles/variables'

const loadingWrapperAnimation = keyframes`
  to {
    transform: rotate(450deg);
  }
`

const loadingCircleAnimation = keyframes`
  to {
    stroke-dashoffset: -540;
  }
`

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Spinner = styled.svg`
  stroke: ${p => p.color || colors.primary};
  transform: rotate(90deg);
  animation: ${loadingWrapperAnimation} 4s linear infinite;
  circle {
    stroke-dasharray: 270;
    stroke-dashoffset: 0;
    animation: ${loadingCircleAnimation} 3s ease-in infinite;
  }
`
