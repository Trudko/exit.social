import React, { useState } from 'react'
import {Button } from 'ui'
import Notification, {NotificationType } from 'ui/Notification'
import {useMutation } from '@apollo/client'
import { useParams, useLocation } from 'react-router'
import EMAIL_VERIFICATION from 'apollo/mutations/emailverification'

import * as S from './styled'

type RouteParams = {
  userName: string,
  followerName: string
} 

const FollowEmailVerification = () => {
  const [emailResend, setEmailResend] = useState<boolean>(false);
  const params = useParams<RouteParams>()
  const location = useLocation();
  const emailAddress = new URLSearchParams(location.search).get('email');
  const [resendEmail, {loading}] = useMutation(
    EMAIL_VERIFICATION,
    {
      variables: {
          influencerID: params.userName,
          followerID: params.followerName
      },
      onCompleted() {
        setNotification({
          ...notification,
          show: true,
        });
        setEmailResend(true);
      }
  });

  const [notification, setNotification] = useState({
    show: false,
    type: NotificationType.Success,
    id: "Email Resend!"
  });

  return (
    <S.Wrapper>
      { notification.show && <Notification type={notification.type} id={notification.id} text="Settings was saved" onClose={() => setNotification({...notification, show: false})} />}
        <S.Title>exit.social</S.Title>
        <S.Description>We've sent you confirmation email to <strong>{emailAddress}</strong> ! Please check your inbox.</S.Description>
        {
          emailResend ?
            <S.Description>Still haven't received an email? Please <a href="mailto:hello@exit.social?subject=Haven't received email">Contact us</a>.</S.Description>
          : <>
              <S.Description>Didn't receive email?</S.Description>
              <Button onClick={resendEmail}>
                  {loading ? 'Loading' : 'Send Again'}
              </Button>
             </>
        }
        
    </S.Wrapper>
  ) 
}

export default FollowEmailVerification
