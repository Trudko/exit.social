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
    margin-bottom: 5px;

    @media ${mediaQueries.laptop} {
      margin-bottom: 0px;
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

export const Label = styled.div`
  ${p => p.theme.fonts.label};
  text-align: right;

  @media ${mediaQueries.laptop} {
    width: 300px;
  }
`

export const TableWrapper = styled.div`
   overflow: auto;
`;

export const TableActions = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 20px;
  width: 100%;

  @media ${mediaQueries.laptop} {
    align-items: center;
  }

  .nrOfFollowersInput {
    margin-bottom: 10px;

    input {
      margin-left: 25px;

      @media ${mediaQueries.laptop} {
        margin-left: 0px;
      }
    }

    @media ${mediaQueries.laptop} {
      width: 100px;
      margin: 0 10px 0 8px;
    }
  }

  @media ${mediaQueries.laptop} {
    margin-top: 0px;
    width: initial;
  }
`;

export const Inputs = styled.div`
  display: flex;
  flex-direction: column;

  @media ${mediaQueries.laptop} {
    flex-direction: row;
  }
`;
