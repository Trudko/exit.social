import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 64px);
  position: relative;
`

export const Header = styled.div`
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100px;
`

export const Title = styled.div`
  ${p => p.theme.fonts.h2};
`

export const PayoutSetup = styled.div`
  margin-right: 8px;
  padding-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .pointsValue {
    margin: 0 8px;

    input {
      width: 96px;
      min-width: auto;
    }
  }
`

export const Label = styled.div`
  ${p => p.theme.fonts.label};
  text-align: right;
  width: 110px;
`

export const Content = styled.div`
  padding: 24px;
  background: ${p => p.theme.colors.softGray};
`

export const Info = styled.div`
  ${p => p.theme.fonts.text5};

  background: ${p => p.theme.colors.gray};
  padding: 16px;
`

export const SubInfo = styled.div`
  ${p => p.theme.fonts.label};

  margin-top: 4px;
  text-align: right;
`
