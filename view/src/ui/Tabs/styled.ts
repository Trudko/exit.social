import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

export const Tab = styled(NavLink)<{
  active?: 1 | 0
}>`
  ${p => p.theme.fonts.h3};

  padding-bottom: 8px;
  color: ${p => (p.active ? p.theme.colors.black : p.theme.colors.darkGray)};
  text-align: center;
  transition: color 0.3s;
  position: relative;
  cursor: ${p => (p.active ? 'default' : 'pointer')};

  &:not(:last-of-type) {
    margin-right: 32px;
  }

  &:after {
    content: ' ';
    height: 4px;
    background: ${p => p.theme.colors.primary};
    border-radius: 100px;
    transform: scaleX(${p => (p.active ? '1' : '0')});
    opacity: ${p => (p.active ? '1' : '0')};
    transition: transform 0.3s, opacity 0.3s;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
  }
`
