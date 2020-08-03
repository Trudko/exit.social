import styled from 'styled-components'

import { Input } from 'ui'

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  > img {
    width: 80px;
    height: 80px;
    margin-bottom: 24px;
    border-radius: 50%;
    object-fit: cover;
  }
`

export const Title = styled.div`
  ${p => p.theme.fonts.h1};

  margin-bottom: 32px;
`

export const Description = styled.div`
  ${p => p.theme.fonts.p1};

  width: 480px;
  margin-bottom: 32px;
  text-align: center;
`

export const Form = styled.div`
  padding-bottom: 24px;
`

export const FormInput = styled(Input)`
  width: 400px;
  margin-bottom: 16px;
`
