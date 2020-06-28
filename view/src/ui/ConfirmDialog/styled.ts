import styled, { keyframes } from 'styled-components'

const show = keyframes`
  from {
    transform: translateY(-20%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
`

export const Dialog = styled.div`
  background: ${p => p.theme.colors.white};
  border-radius: 8px;
  width: 480px;
  z-index: 1;
  animation: ${show} 0.3s linear;
`

export const DialogTitle = styled.div`
  ${p => p.theme.fonts.h4};
  position: relative;
  padding: 24px 32px;
  
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 16px;
    bottom: 16px;
    width: 8px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    background: ${p => p.theme.colors.primary};
  }
`

export const DialogContent = styled.div`
  padding: 0 32px;
`

export const DialogActions = styled.div`
  padding: 24px;
  margin-top: 64px;
  display: flex;
  align-items:center;
  justify-content: flex-end;
  
  button {
    &:not(:first-of-type) {
      margin-left: 8px;      
    }
  }
`

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: ${p => p.theme.colors.black};
  opacity: 0.4;
`
