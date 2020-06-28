import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: 100vh;
`

export const Header = styled.div`
  padding: 16px 24px;
  background: ${p => p.theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    ${p => p.theme.fonts.text1};

    font-size: 20px;
    font-weight: 800;
  }
`

export const NavigationItems = styled.div`
  display: flex;
  align-items:center;
`

export const NavigationItem = styled.div<{active: boolean}>`
  ${p => p.theme.fonts.text7};
  margin: 0 12px;
  font-weight: ${p => p.active ? "bold" : "normal"};
  cursor: pointer;
`
