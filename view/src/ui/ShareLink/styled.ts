import styled from 'styled-components'
import mediaQueries from "utils/mediaQueries";

type Props = {
  columnOrientation?: boolean;
}

export const Wrapper = styled.div<Props>`
  display: flex;
  justify-content: center;

  @media ${mediaQueries.laptop} {
    flex-direction: column;
    width: 100%;
    flex-direction: ${p => p.columnOrientation ? 'column' :  'row'};
    align-items: center;
  }

  > button {
    margin-left: 8px;
    font-size: 14px;
    margin-top: ${p => p.columnOrientation ? '48px' :  '0'};
    padding: 0px;
    height: 40px;

    @media ${mediaQueries.laptop} {
      width: 240px;
      padding: 8px 20px;
    }
  }
`

export const Label = styled.div<Props>`
  margin: ${p => p.columnOrientation ? '16px 0 0 0' :  '0 16px'};
  color: ${p => p.theme.colors.darkGray};
  font-size: 12px;
  font-weight: 700;
`

export const Value = styled.div<Props>`
  width: 100%;
  /* width: 424px; */
  background: ${p => p.theme.colors.white};
  border: 1px solid ${p => p.theme.colors.gray};
  border-radius: 100px;
  display: flex;
  align-items: center;

  @media ${mediaQueries.laptop} {
      width: initial;
  }

  > * {
    padding: 8px 16px;
    font-size: 12px;
    font-weight: 700;
    line-height: 22px;
  }

  input {
    overflow: hidden;
    color: ${p => p.theme.colors.black};
    white-space: nowrap;
    text-overflow: ellipsis;
    flex: 1;
    padding: 10px 16px;
  }

  button {
    color: ${p => p.theme.colors.primary};
    
    &:hover {
      opacity: 0.7;
    }
  }
`

export const ShareText = styled.div`
   margin-left: 10px;
`;