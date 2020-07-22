import styled from 'styled-components'
import { transparentize } from 'polished'
import mediaQueries from "utils/mediaQueries";

export const Wrapper = styled.div`
  position: relative;
`

export const Button = styled.button`
  ${p => p.theme.fonts.text1};

  display: flex;
  align-items: center;
  cursor: pointer;
`
export const Username = styled.div`
  display: none;

  @media ${mediaQueries.laptop} {
    display: block;
  }
`

export const ProfilePicture = styled.div<{
  src: string
}>`
    width: 32px;
    height: 32px;
    margin-left: 16px;
    background: url(${p => p.src}) center / cover no-repeat;
    border-radius: 50%;
`

export const Dropdown = styled.div`
  overflow: hidden;
  background: ${p => p.theme.colors.white};
  border-radius: 8px;
  box-shadow: 0px 4px 16px ${p => transparentize(0.8, p.theme.colors.black)};
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  z-index: 100;
`

export const DropdownItem = styled.button`
  ${p => p.theme.fonts.text4};

  min-width: 200px;
  padding: 14px;
  color: ${p => p.theme.colors.black};
  display: flex;
  align-items: center;

  &:hover {
    background: ${p => transparentize(0.5, p.theme.colors.lightGray)};
  }

  &:not(:last-of-type) {
    border-bottom: 1px solid ${p => p.theme.colors.softGray};
  }

  img {
    width: 20px;
    height: 20px;
    margin-right: 14px;
    object-fit: contain;
  }
`
