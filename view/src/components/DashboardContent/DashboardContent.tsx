import React, { useState } from 'react'
import { CSVLink } from 'react-csv'
import CSS from 'csstype'

import { FollowersInterface } from 'types/followers'
import { Tabs, Input, Button, ExportIcon } from 'ui'
import { FollowersTable } from 'components'

import * as S from './styled'

type Props = {
  data?: FollowersInterface
  className?: string
  style?: CSS.Properties
}

const DashboardContent = ({ data, className = '', style }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  return (
    <S.Wrapper className={className} style={style}>
      <S.Header>
        <Tabs
          id="dashboard-tabs"
          items={[
            {
              text: 'Converted followers',
              href: '/dashboard'
            }
          ]}
        />
        <S.TableActions>
          <Input
            icon="/icons/search.svg"
            placeholder="Search by Twitter handle"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            style={{ marginRight: '8px' }}
          />
          {data?.followers?.values && (
            <CSVLink
              data={data.followers.values}
              filename="exit-social_export.csv"
              onClick={() => {
                if (data.followers?.values.length === 0) {
                 return false; 
                }
              }}
            >
              <Button buttonTheme="secondary" disabled={data.followers?.values.length === 0}>
                <ExportIcon/>
                <span>Export</span>
              </Button>
            </CSVLink>
          )}
        </S.TableActions>
      </S.Header>
      <S.TableWrapper>
        <FollowersTable
          tableData={data?.followers?.values}
          searchQuery={searchQuery}
        />
      </S.TableWrapper>
    </S.Wrapper>
  )
}

export default DashboardContent
