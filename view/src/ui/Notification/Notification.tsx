import React, {useEffect} from "react";

import "react-toastify/dist/ReactToastify.css"
import {toast } from "react-toastify"

import * as S from './styled'

export enum NotificationType {
    Success = "success",
    Error = "error"
}

type Props = {
    text: string,
    type: NotificationType
}

const Notification = ({text, type}: Props) => {
    useEffect(() => {
        if (type === NotificationType.Success) {
            toast.success(text, {
                toastId: text
            });
        } else if (type === NotificationType.Error) {
            toast.error(text, {
                toastId: text
            });
        }
    });

    return (
        <S.Toast/>
    )
}

export default Notification;