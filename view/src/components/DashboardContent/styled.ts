import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.div`
  padding: 16px 16px;
  background: ${p => p.theme.colors.softGray};

  @media ${mediaQueries.laptop} { 
    padding: 24px;
  }
`

export const Header = styled.div`
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: skpace-between;
  flex-direction: column;

  @media ${mediaQueries.laptop} {
    flex-direction: row;
  }

  button {
    margin-top: 5px;

    @media ${mediaQueries.laptop} {
      margin-top: 0px;
    }

    span {
      display: none;

      @media ${mediaQueries.laptop} {
        display: inline;
        margin-left: 10px;
      }
    }
  }
`

export const TableWrapper = styled.div`
   overflow: auto;
`;

export const TableActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;

  @media ${mediaQueries.laptop} {
    margin-top: 0px;
    width: initial;
  }
`;
