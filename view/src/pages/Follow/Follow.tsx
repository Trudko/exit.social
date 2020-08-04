import React, { useState } from 'react'
import { useDidUpdate } from 'react-hooks-lib'
import { useParams, useLocation } from 'react-router'
import { useQuery } from '@apollo/client'
import INFLUENCER_QUERY from 'apollo/queries/influencer'
import { InfluencerInterface } from 'types/users'
import { Loading, Button, InfluencerPicture } from 'ui'
import Web3 from "web3";

import * as S from './styled'

type RouteParams = {
  userName: string,
  ref: string
}

type Form = {
  email: string
  ethAddress: string
}

const Follow = () => {
  const params = useParams<RouteParams>()
  const location = useLocation();
  const [form, setForm] = useState<Form>({
    email: '',
    ethAddress: ''
  })
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false)
  const [ethAddressInvalid, setEthAddressInValid] = useState<boolean>(false)
  const { data, loading } = useQuery<InfluencerInterface>(INFLUENCER_QUERY, {
    variables: {
      id: params.userName
    }
  })

  useDidUpdate(() => {
    if (form.email) setEmailInvalid(false)
  }, [form.email])

  const handleConfirm = () => {
    const emailValid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      form.email
    );
    setEmailInvalid(!emailValid);
   
    const ref = new URLSearchParams(location.search).get('ref');
    
    const ethAddressValid = form.ethAddress.trim() === "" || Web3.utils.isAddress(form.ethAddress);
    setEthAddressInValid(!ethAddressValid);
   
    if (emailValid && ethAddressValid) {
      let redirectURL = `${process.env.REACT_APP_API_URL || 'http://localhost:8080/api'}/influencers/${params.userName}/follow?email=${form.email}`;
      if (form.ethAddress) {
        redirectURL += `&ethAddress=${form.ethAddress}`
      }

      if (ref) (
        redirectURL += `&ref=${ref}`
      )
      window.location.href = redirectURL;
    }
  }

  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data?.influencer?.photoURL && (
            <InfluencerPicture src={data.influencer.photoURL}/>
          )}
          <S.Title>Hi!</S.Title>
          {data?.influencer?.message && (
            <S.Description>{data.influencer.message}</S.Description>
          )}
          <S.Form>
            <S.FormInput
              icon="/icons/mail.svg"
              placeholder="Type your email here"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              invalid={emailInvalid}
            />
            { data.influencer.allowPayout &&
              <S.FormInput
                icon="/icons/ethereum.svg"
                placeholder="Your Ethereum Wallet Address"
                value={form.ethAddress}
                onChange={e => setForm({ ...form, ethAddress: e.target.value })}
                invalid={ethAddressInvalid}
              />
            }
          </S.Form>
          <Button onClick={handleConfirm}>
            <img src="/icons/twitter.svg" alt="Twitter" />
            Validate via Twitter
          </Button>
        </>
      )}
    </S.Wrapper>
  )
}

export default Follow
