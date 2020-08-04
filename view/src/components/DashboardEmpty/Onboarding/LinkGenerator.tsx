import React, {useRef, useState} from "react";

import { Button, LinkIcon, SuccessIcon } from 'ui'

import * as S from './styled';

type Props = {
    link: string,
    onLinkGeneration: () => void
};

export const LinkGenerator: React.FC<Props> = ({link, onLinkGeneration}: Props) =>  {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [shareLinkVisible, setShareLinkVisible] = useState(false);


    return (
        <S.LinkGeneratorWrapper>
        {
            !shareLinkVisible ? 
                <Button onClick={() => { 
                    setShareLinkVisible(true);
                    onLinkGeneration()
                }}>
                    <LinkIcon/>
                    <S.LinkText>Generate Invite Link</S.LinkText>
                </Button>
            :
                <S.Value>
                    <input
                        readOnly
                        ref={inputRef}
                        type="text"
                        value={link}
                    />
                    <S.ValueWrapper>
                        <SuccessIcon/>
                        Generated
                    </S.ValueWrapper>
                </S.Value>      
        }
        </S.LinkGeneratorWrapper>
    );
}

export default LinkGenerator;