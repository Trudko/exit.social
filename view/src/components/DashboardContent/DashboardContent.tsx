import React, { useState } from 'react'
import { CSVLink } from 'react-csv'
import CSS from 'csstype'
import { useDebounce } from 'hooks'
import { FollowersInterface, FollowerInterface} from 'types/followers'
import { Tabs, Input, Button, ExportIcon, NumberInput } from 'ui'
import { FollowersTable } from 'components'
import { useMediaQuery } from 'react-responsive'
import mediaQueries from "utils/mediaQueries";

import * as S from './styled'

type Props = {
  data?: FollowersInterface
  className?: string
  style?: CSS.Properties
}

const DashboardContent = ({ data, className = '', style }: Props) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [minNrFollowers, setMinNrFollowers] = useState<string>('');
  const [followers, setFollowers] = useState<FollowerInterface[]>(data?.followers?.values);
  const intialFollowers = data?.followers?.values;

  useDebounce(() => {
    const filteredFollowers = intialFollowers.filter((follower) => {
      if (minNrFollowers === "") {
        return true;
      }
      return follower.followersCount >= parseInt(minNrFollowers, 10);
    }).filter((follower) => {
      if (searchQuery === "") {
        return true;
      }
      return follower.username.includes(searchQuery);
    });

    setFollowers(filteredFollowers);
  }, 500, [minNrFollowers, searchQuery])

  const isMobile = !useMediaQuery({ query: mediaQueries.laptop });

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
        { !isMobile && <S.Label>Min. nr of followers</S.Label>}
        <S.Inputs>
          <NumberInput
              className="nrOfFollowersInput" 
              placeholder={!isMobile ? "" : "Min. nr of followers"}
              value={minNrFollowers} 
              onChange={value => setMinNrFollowers(value)}
              min={0}
              maxLength={7}
          />
            <Input
              icon="/icons/search.svg"
              placeholder="Search by Twitter handle"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ marginRight: '16px', width: '100%' }}
            />
          </S.Inputs>
          {data?.followers?.values && (
            <CSVLink
              data={followers}
              filename="exit-social_export.csv"
              onClick={() => {
                if (followers.length === 0) {
                 return false; 
                }
              }}
            >
              <Button buttonTheme="secondary" disabled={followers.length === 0}>
                <ExportIcon/>
                <span>Export</span>
              </Button>
            </CSVLink>
          )}
        </S.TableActions>
      </S.Header>
      <S.TableWrapper>
        <FollowersTable
          tableData={followers}
          searchQuery={searchQuery}
        />
      </S.TableWrapper>
    </S.Wrapper>
  )
}

export default DashboardContent
