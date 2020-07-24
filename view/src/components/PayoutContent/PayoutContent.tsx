import React, { useContext, useMemo, useState } from 'react'

import { Link} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import LEADERBOARD_QUERY from 'apollo/queries/leaderboard'
import CONVERSIONS_QUERY from 'apollo/queries/conversions'
import PAYOUT_MUTATION from 'apollo/mutations/payout'
import { LeaderboardInterface } from 'types/leaderboard'
import { Button, ConfirmDialog, NumberInput, Loading, Tabs, EthereumIcon } from 'ui'
import { AuthContext } from 'contexts'
import { PayoutTable } from 'components'
import { getETHString, getUSDString } from 'utils/functions'
import { ConversionsInterface } from 'types/conversions'

import Web3 from "web3";

import * as S from './styled'

const Payout = () => {
  const { user } = useContext(AuthContext)
  const {
    data: leaderboardData,
    loading: leaderboardDataLoading,
    refetch: refetchLeaderboard
  } = useQuery<LeaderboardInterface>(LEADERBOARD_QUERY, {
    variables: {
      influencerID: user?.username
    }
  })
  const { data: conversionsData, loading: conversionsDataLoading } = useQuery<
    ConversionsInterface
  >(CONVERSIONS_QUERY)
  const [savePayout] = useMutation(PAYOUT_MUTATION)
  const [selected, setSelected] = useState<string[]>([])
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false)
  const [pointsValueEth, setPointsValueEth] = useState("0.00001")
  const ethUSDConversion = useMemo(() => {
      if (conversionsDataLoading) {
        return 0
      }
      return conversionsData?.conversions?.find(conversion => conversion.symbol === 'ETHUSDT')?.price || 0
    },
    [conversionsDataLoading, conversionsData]
  )
  const pointsValueUSD = useMemo(() =>
    Number(pointsValueEth) * ethUSDConversion,
    [ethUSDConversion, pointsValueEth]
  )

  const totalEth = useMemo(() => {
    const totalScore = selected
      .map(
        selectedUsername =>
          leaderboardData?.leaderboard?.followers?.find(
            leader => leader.username === selectedUsername
          )?.score || 0
      )
      .reduce((total, score) => total + score, 0)
    return totalScore * Number(pointsValueEth)
  }, [leaderboardData, pointsValueEth, selected])
  const totalUSD = useMemo(() => totalEth * ethUSDConversion, [
    ethUSDConversion,
    totalEth
  ])

  const toPayoutFollower = (follower, index) => ({
    ...follower,
    position: index + 1,
    selected: selected.includes(follower.username),
    payoutScore: follower.payoutScore,
    payoutValueEth: follower.score * Number(pointsValueEth),
    payoutValueUSD: follower.score * pointsValueUSD
  })

  const handlePayout = () => {
    setConfirmDialogVisible(true)
  }

  const selectionChanged = (username, userSelected) => {
    if (userSelected) {
      setSelected(selected.concat(username))
    } else {
      setSelected(
        selected.filter(selectedUsername => selectedUsername !== username)
      )
    }
  }

  const payoutCancelled = () => {
    setConfirmDialogVisible(false)
  }

  const payoutConfirmed = async () => {

    if (!window.ethereum) {
      return //TODO
    }
    const web3 = new Web3(window.ethereum)
    const accounts =  await window.ethereum.enable();
    const account = accounts[0];
    
    const selectedUsers = leaderboardData.leaderboard.followers.filter((follower) => {
      return selected.includes(follower.username);
    });

    for (const follower of selectedUsers) {
      web3.eth.sendTransaction({
        from: account,
        to: follower.ethAddress,
        value: Web3.utils.toWei("" + follower.score * Number(pointsValueEth), 'ether'),
      }).on('transactionHash', async (hash) => {
        await savePayout({
          variables: {
            payoutData:[{
              transactionID: hash,
              followerID: follower.username
            }]
          }
        })
      });
    };
    setSelected([]);
    setConfirmDialogVisible(false)
    await refetchLeaderboard()
  }
 
  return (
    <S.Wrapper>
      {leaderboardDataLoading ? (
        <Loading />
      ) : (

        !user.allowPayout ? <S.DisabledPayout>
          <S.Title>Payouts are disabled</S.Title>
          <S.SubTitle>
            Please enable payouts in the <Link to={`/settings/`}> Settings</Link>
.
          </S.SubTitle>

        </S.DisabledPayout> :

        <>
          <S.Header>
            <S.Title>Choose users for payout</S.Title>
            <Button onClick={handlePayout} disabled={selected.length === 0}>
              <EthereumIcon/>
              <span>Pay reward for selected</span>
            </Button>
          </S.Header>
          <S.Content>
            <S.PayoutSetup>
              <Tabs
              id="dashboard-tabs"
              items={[
                {
                  text: 'Users score',
                  href: '/payout'
                }
              ]}
            />
              <S.PayoutWrapper>
                <S.Label>1 point = </S.Label>
                <NumberInput
                  className="pointsValue" 
                  value={pointsValueEth} 
                  onChange={setPointsValueEth} 
                  min={0.000001} 
                  max={10} 
                  maxLength={pointsValueEth.startsWith("0.") ? 8 : 2} 
                />
                <S.Label>ETH (${getUSDString(pointsValueUSD, false, 4)})</S.Label>
                </S.PayoutWrapper>
            </S.PayoutSetup>
          
            
              <PayoutTable
                tableData={leaderboardData?.leaderboard?.followers.map(
                  toPayoutFollower
                )}
                payRewardSelectionChanged={selectionChanged}
              />
          </S.Content>

          {confirmDialogVisible && (
            <ConfirmDialog
              title="Rewards payout"
              confirmText={window.ethereum ? "Confirm In Metamask" : "Close"}
              onCancel={payoutCancelled}
              onConfirm={window.ethereum && payoutConfirmed}
            >
              {
                window.ethereum ? (
                    <>
                    <S.Info>
                      You are about to pay <strong>{getETHString(totalEth)} ETH (${getUSDString(totalUSD)})</strong> in rewards to {selected.length} followers in an exchange for all of their points.
                    </S.Info>
                    <S.SubInfo>
                    100 points = {getETHString(Number(pointsValueEth) * 100)} ETH (${getUSDString(pointsValueUSD * 100)})
                    </S.SubInfo>
                  </>
              ) : (
                <S.Info>Please install <a href="https://metamask.io/">Metamask</a> </S.Info>
              )

              }
             
            </ConfirmDialog>
          )}
        </>
      )}
    </S.Wrapper>
  )
}

export default Payout
