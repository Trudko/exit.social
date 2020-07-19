import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 16px 24px;
  background: ${p => p.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: space-between;

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

