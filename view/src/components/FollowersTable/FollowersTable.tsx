import React, { useMemo } from 'react'
import CSS from 'csstype'

import { Table } from 'ui'
import {
  UsernameColumn,
} from 'components/LeadersTable/LeadersTable'

import { FollowerInterface } from 'types/followers'

import * as S from './styled'

type TableProps = {
  username: number
  followersCount: number
  verified: boolean
  converted: boolean
  email: string
}

type Props = {
  tableData?: FollowerInterface[]
  searchQuery?: string
  className?: string
  style?: CSS.Properties
}

const FollowersTable = ({
  tableData,
  searchQuery,
  className = '',
  style
}: Props) => {
  const columns = useMemo(
    () => [
      UsernameColumn,
      {
        Header: '# of followers',
        accessor: 'followersCount'
      },
      {
        Header: 'Verified',
        accessor: (props: TableProps) =>
          props.verified ? (
            <S.Verified>
              <img src="/icons/verified.svg" alt="Verified" />
              Verified
            </S.Verified>
          ): 'No'
      },
      {
        Header: 'Email',
        accessor: 'email'
      }
    ],
    []
  )

  return (
    <Table
      entityName={tableData?.length === 1 ? 'follower' : 'followers'}
      columns={columns}
      tableData={tableData}
      searchColumnID="username"
      searchQuery={searchQuery}
      className={className}
      style={style}
    />
  )
}

export default FollowersTable
