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
    id?: string,
    type: NotificationType,
    onClose?: () => void,
}

const Notification = ({text, id, type, onClose}: Props) => {
    useEffect(() => {
        if (type === NotificationType.Success) {
            toast.success(text, {
                toastId: id || text,
                onClose: onClose || undefined
            });
        } else if (type === NotificationType.Error) {
            toast.error(text, {
                toastId: id || text,
                onClose: onClose || undefined
            });
        }
    });

    return (
        <S.Toast/>
    )
}

export default Notification;