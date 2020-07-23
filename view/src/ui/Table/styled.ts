import styled from 'styled-components'
import mediaQueries from 'utils/mediaQueries';

export const Wrapper = styled.table`
  width: 100%;
  overflow: hidden;
  box-shadow: 0 0 0 1px ${p => p.theme.colors.gray};
  border-radius: 4px;
  border-collapse: collapse;

  th,
  td {
    padding: 8px 8px;
    text-align: left;

    @media ${mediaQueries.laptop} {
      padding: 8px 24px;
    }
  }

  th {
    user-select: none;
  }

  td {
    ${p => p.theme.fonts.p2};
    background: ${p => p.theme.colors.white};
    height: 48px;
  }

  thead th {
    ${p => p.theme.fonts.text4};

    background: ${p => p.theme.colors.gray};

    > div {
      display: flex;
      align-items: center;
    }
  }

  tbody tr {
    /* Empty row to separate table body from table footer */
    &:last-of-type td {
      padding: 20px;
    }

    &:not(:last-of-type) td {
      border-bottom: 1px solid ${p => p.theme.colors.softGray};
    }
  }

  tfoot tr td {
    border-top: 1px solid ${p => p.theme.colors.gray};
    color: ${p => p.theme.colors.darkGray};

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
`

export const TableHeader = styled.th<{
  width?: string
}>`
  width: ${p => p.width};
`

export const SortingArrow = styled.div<{
  isDesc?: boolean
}>`
  width: 10px;
  margin-left: 12px;
  transform: ${p => p.isDesc && 'rotate(180deg)'};
  display: flex;
  align-items: center;
`

export const PaginationButton = styled.button<{ active?: boolean }>`
  width: 24px;
  height: 24px;
  margin: 0 5px;
  background: ${p => p.active && p.theme.colors.primary};
  border-radius: 50%;
  color: ${p => (p.active ? p.theme.colors.white : p.theme.colors.darkGray)};
  font-size: 12px;
  font-weight: 700;
  opacity: ${p => p.disabled && '0.25'};
  transition: background 0.3s, opacity 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${p => (p.active || p.disabled ? 'default' : 'pointer')};

  &:hover {
    background: ${p => !p.disabled && !p.active && p.theme.colors.lightGray};
  }

  img {
    height: 10px;
  }
`

