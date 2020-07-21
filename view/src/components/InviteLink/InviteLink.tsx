import React, {useState} from "react";
import {ShareLink, Button, LinkIcon } from 'ui'

import * as S from "./styled";

const InviteLink = () => {
    const [shareLinkVisible, setShareLinkVisible] = useState<boolean>(false)

    return (
        <S.Share>
            <S.ShareItem visible={!shareLinkVisible} >
            <Button onClick={() => setShareLinkVisible(true)}>
                <LinkIcon/>
                <span>Generate Invite Link</span>
            </Button>
            </S.ShareItem>
            <S.ShareItem visible={shareLinkVisible}>
                <ShareLink withButton label="MY LINK" />
            </S.ShareItem>
        </S.Share>
        )
    }   

export default InviteLink;
