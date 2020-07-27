import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.div`
  min-height: 100vh;
`

export const Header = styled.div`
  padding: 16px 12px;
  background: ${p => p.theme.colors.primary};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media ${mediaQueries.laptop} {
    align-items: center;
    padding: 16px 12px;
  }
`
export const Logo = styled.div`
  cursor: pointer;
  ${p => p.theme.fonts.text1};
  font-size: 20px;
  font-weight: 800;
  order: 1;
  width: 50%;
  margin-bottom: 24px;

  @media ${mediaQueries.laptop} {
    margin-bottom: 0px;
    width: initial;
  }
`;

export const NavigationItems = styled.div`
  display: flex;
  align-items:center;
  order: 3;

  @media ${mediaQueries.laptop} {
    order: 2;
  }
`

export const NavigationItem = styled.div<{active: boolean}>`
  ${p => p.theme.fonts.text7};
  font-weight: ${p => p.active ? "bold" : "normal"};
  cursor: pointer;

  :not(:first-child) {
    margin: 0 12px;
  }
`
