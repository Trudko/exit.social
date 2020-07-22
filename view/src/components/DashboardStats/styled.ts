import styled from 'styled-components'
import mediaQueries from "utils/mediaQueries";

export const Wrapper = styled.div`
  padding: 16px 12px;
  background: ${p => p.theme.colors.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media ${mediaQueries.laptop} {
    flex-direction: row;
  }

  img {
    width: 20px;
    height: 20px;
  }

  > button {
    font-size: 14px;
  }
`

export const Inner = styled.div`
  display: flex;
  margin-bottom: 24px;

  @media ${mediaQueries.laptop} {
    flex-direction: row;
    margin-bottom: 0px;
  }
`

export const Card = styled.div`
  min-width: 176px;
  padding: 10px 16px;
  background: ${p => p.theme.colors.softGray};
  border-radius: 8px;

  &:not(:last-of-type) {
    margin-right: 16px;
  }

  > span {
    ${p => p.theme.fonts.text3};

    text-transform: uppercase;
    display: block;
  }

  > strong {
    ${p => p.theme.fonts.h2};

    display: flex;
    align-items: flex-end;

    > span {
      margin-left: 5px;
      font-size: 16px;
      line-height: 28px;
    }

    > small {
      ${p => p.theme.fonts.text2};

      margin-left: auto;
      padding-left: 16px;
      color: ${p => p.theme.colors.darkGray};
    }
  }
`

