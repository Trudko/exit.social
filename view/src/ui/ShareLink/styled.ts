import styled from 'styled-components'
import mediaQueries from "utils/mediaQueries";

type Props = {
  columnOrientation?: boolean;
}

export const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media ${mediaQueries.laptop} {
    flex-direction: ${p => p.columnOrientation ? 'column' :  'row'};
    align-items: center;
  }

  > button {
    margin-left: 8px;
    font-size: 14px;
    margin-top: 10px;
    width: 214px;
    
    @media ${mediaQueries.laptop} {
      margin-top: ${p => p.columnOrientation ? '48px' :  '0'};
    }
  }
`

export const Label = styled.div<Props>`
  margin: ${p => p.columnOrientation ? '16px 0' :  '0 16px'};
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
  margin-top: 10px;
  
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
  }

  button {
    color: ${p => p.theme.colors.primary};
    

    &:hover {
      opacity: 0.7;
    }
  }
`
