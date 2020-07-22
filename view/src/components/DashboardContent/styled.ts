import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.div`
  padding: 24px;
  background: ${p => p.theme.colors.softGray};
`

export const Header = styled.div`
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

export const TableActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  
`;
