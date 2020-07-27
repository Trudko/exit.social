import React, { useMemo } from 'react'

import {
  PositionColumn,
  ScoreColumn,
  UsernameColumn,
  TOP_LEADER_COUNT
} from 'components/LeadersTable/LeadersTable'

import { Checkbox, Table } from 'ui'
import * as S from './styled'
import { PayoutFollower } from 'types/payout'
import { getETHString, getUSDString } from 'utils/functions'

type TableProps = {
  position: number
  username: number
  score: number
  ethAddress: string
  payoutScore: number
  payoutValueEth: number
  payoutValueUSD: number
  selected: boolean
}

type Props = {
  tableData?: PayoutFollower[]
  payRewardSelectionChanged: (username, selected) => void
}

const PayoutTable = ({ tableData, payRewardSelectionChanged }: Props) => {
  const columns = useMemo(
    () => [
      {
        width: '30',
        Header: ' ',
        accessor: (props: TableProps) => (
          <Checkbox
            disabled={props.payoutScore === 0 || !props.ethAddress}
            value={props.selected}
            onChange={selected =>
              payRewardSelectionChanged(props.username, selected)
            }
          />
        )
      },
      {
        ...PositionColumn,
        width: '30'
      },
      UsernameColumn,
      ScoreColumn,
      {
        Header: 'Reward Points',
        accessor: (props: TableProps) => {
          if (props.position <= TOP_LEADER_COUNT) {
            return <strong>{props.payoutScore}</strong>
          } else {
            return props.payoutScore
          }
        }
      },
      {
        Header: 'Ethereum Address',
        accessor: (props: TableProps) => {
          if (props.position <= TOP_LEADER_COUNT) {
            return <strong>{props.ethAddress || 'Not provided'}</strong>
          } else {
            return props.ethAddress || 'Not provided'
          }
        }
      },
      {
        Header: 'Payout',
        accessor: (props: TableProps) => {
          if (!props.selected) {
            return null
          } else {
            return (
              <S.Text>
                {getETHString(props.payoutValueEth)} ETH ($
                {getUSDString(props.payoutValueUSD)})
              </S.Text>
            )
          }
        }
      }
    ],
    [payRewardSelectionChanged]
  )

  return (
    <S.Wrapper>
      <Table 
        tableData={tableData}
        columns={columns}
        entityName={tableData?.length === 1 ? 'follower' : 'followers'}
      />
    </S.Wrapper>
  )
}

export default PayoutTable
