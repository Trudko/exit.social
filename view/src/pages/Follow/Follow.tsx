import React, { useState } from 'react'
import { useDidUpdate } from 'react-hooks-lib'
import { useParams } from 'react-router'
import { useQuery } from '@apollo/client'

import INFLUENCER_QUERY from 'apollo/queries/influencer'
import { InfluencerInterface } from 'types/users'
import { Loading, Button } from 'ui'

import * as S from './styled'

type RouteParams = {
  userName: string
}

type Form = {
  email: string
  ethAddress: string
}

const Follow = () => {
  const params = useParams<RouteParams>()
  const [form, setForm] = useState<Form>({
    email: '',
    ethAddress: ''
  })
  const [emailInvalid, setEmailInvalid] = useState<boolean>(false)
  const { data, loading } = useQuery<InfluencerInterface>(INFLUENCER_QUERY, {
    variables: {
      id: params.userName
    }
  })

  useDidUpdate(() => {
    if (form.email) setEmailInvalid(false)
  }, [form.email])

  const handleConfirm = () => {
    const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
      form.email
    )

    setEmailInvalid(!valid)

    if (valid) {
      window.location.href = `${
        process.env.REACT_APP_API_URL || 'http://localhost:8080/api'
      }/influencers/${params.userName}/follow?email=${form.email}${
        form.ethAddress ? `&ethAddress=${form.ethAddress}` : ''
      }`
    }
  }

  return (
    <S.Wrapper>
      {loading ? (
        <Loading />
      ) : (
        <>
          {data?.influencer?.photoURL && (
            <img src={data.influencer.photoURL} alt="" />
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
            <S.FormInput
              icon="/icons/ethereum.svg"
              placeholder="Your Ethereum Wallet Address"
              value={form.ethAddress}
              onChange={e => setForm({ ...form, ethAddress: e.target.value })}
            />
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
