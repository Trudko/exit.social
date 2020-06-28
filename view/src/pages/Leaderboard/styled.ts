import styled from 'styled-components'

export const Wrapper = styled.div`
  min-height: calc(100vh - 192px);
  padding: 48px 48px 104px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Title = styled.div`
  ${p => p.theme.fonts.h1};
  margin-bottom: 8px;
`

export const SubTitle = styled.div`
  ${p => p.theme.fonts.text5};
  margin-bottom: 32px;
`

export const SearchInputWrapper = styled.div`
  margin-bottom: 44px;

  input {
    font-size: 12px;
    width: 256px;
  }
`
