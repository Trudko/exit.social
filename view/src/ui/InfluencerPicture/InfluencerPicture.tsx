import React from 'react'

import * as S from './styled'

type Props = {
    src: string
}

const InfluencerPicture = ({src} :Props) => <S.Wrapper src={src}></S.Wrapper>

export default InfluencerPicture
