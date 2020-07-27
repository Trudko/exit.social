import React, { useMemo } from 'react'

import { LeaderInterface } from 'types/leaderboard'
import { Table } from 'ui'
import LeaderBadge from './LeaderBadge'

import * as S from './styled'

export const TOP_LEADER_COUNT = 3

export const PositionColumn = {
  Header: 'Position',
  accessor: (props: TableProps) =>
    <S.PositionWrapper>
      <S.BadgeWrapper>
        <LeaderBadge position={props.position}/>
      </S.BadgeWrapper>
      <S.Position top={props.position <= TOP_LEADER_COUNT}>{props.position}</S.Position>
    </S.PositionWrapper>
}

export const UsernameColumn = {
  Header: 'Twitter',
  id: 'username',
  accessor: (props: TableProps) => props.username,
  Cell: (value) => {
    const {cell} = value
    if (cell.row.original.position <= TOP_LEADER_COUNT) {
      return <strong><a href={`https://www.twitter.com/${cell.value}`}>{cell.value}</a></strong>
    } else {
      return <a href={`https://www.twitter.com/${cell.value}`}>{cell.value}</a>
    }
  }
}

export const ScoreColumn = {
  Header: 'Total Score',
  accessor: (props: TableProps) => {
    if (props.position <= TOP_LEADER_COUNT) {
      return <strong>{props.score}</strong>
    } else {
      return props.score
    }
  }
}

type TableProps = {
  position: number
  username: number
  score: number
}

type Props = {
  tableData?: LeaderInterface[]
  searchQuery?: string
}

const LeadersTable = ({ tableData, searchQuery }: Props) => {
  const columns = useMemo(
    () => [
      PositionColumn,
      UsernameColumn,
      ScoreColumn
    ],
    []
  )

  return (
    <S.Wrapper>
      <Table
        tableData={tableData}
        columns={columns}
        entityName="followers"
        searchColumnID="username"
        searchQuery={searchQuery}
      />
    </S.Wrapper>
  )
}

export default LeadersTable
