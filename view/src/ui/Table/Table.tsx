import React from 'react'
import CSS from 'csstype'
import { useTable, useSortBy, usePagination, useFilters, Column } from 'react-table'
import { useDebounce } from 'hooks'

import * as S from './styled'

type Props = {
  entityName: string
  columns: Column[]
  tableData: any[]
  searchColumnID?: string
  searchQuery?: string
  className?: string
  style?: CSS.Properties
}

const Table = ({ className = '', style, columns, tableData, entityName, searchColumnID, searchQuery }: Props) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    // @ts-ignore
    page,
    prepareRow,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage,
    // @ts-ignore
    pageOptions,
    // @ts-ignore
    pageCount,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    state: { pageIndex },
    // @ts-ignore
    setFilter
  } = useTable(
    {
      // @ts-ignore
      columns,
      data: tableData,
      initialState: {
        // @ts-ignore
        pageSize: 20,
        pageIndex: 0
      }
    },
    useFilters,
    useSortBy,
    usePagination
  )

  useDebounce(() => {
    if (searchColumnID) {
      setFilter(searchColumnID, searchQuery)
    }
  }, 500, [searchColumnID, searchQuery])

  const renderPagination = () => {
    let pages: number[]

    if (pageOptions.length < 6) {
      pages = pageOptions
    } else if (pageIndex < 3) {
      pages = pageOptions.slice(0, 5)
    } else if (pageIndex < pageOptions.length - 3) {
      pages = pageOptions.slice(pageIndex - 2, pageIndex + 3)
    } else {
      pages = pageOptions.slice(-5)
    }

    return pages.map((item: number) => (
      <S.PaginationButton
        key={`pagination-button-${item}`}
        active={pageIndex === item}
        onClick={() => gotoPage(item)}
      >
        {item + 1}
      </S.PaginationButton>
    ))
  }

  return (
    <S.Wrapper {...getTableProps()} className={className} style={style}>
      <thead>
      {headerGroups.map(row => (
        <tr {...row.getHeaderGroupProps()}>
          {/* 'any' type hack to supress TS error about getSortByToggleProps */}
          {row.headers.map((column: any) => (
            <S.TableHeader width={column.width} {...column.getHeaderProps(column.getSortByToggleProps())}>
              <div>
                {column.render('Header')}
                <S.SortingArrow isDesc={column.isSortedDesc}>
                  {column.isSorted && (
                    <img src="/icons/arrow-down.svg" alt="Sort"/>
                  )}
                </S.SortingArrow>
              </div>
            </S.TableHeader>
          ))}
        </tr>
      ))}
      </thead>
      <tbody {...getTableBodyProps()}>
      {tableData?.length ? (
        page.map(row => {
          prepareRow(row)

          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(column => (
                <td {...column.getCellProps()}>{column.render('Cell')}</td>
              ))}
            </tr>
          )
        })
      ) : (
        <tr>
          <td colSpan={columns.length}>No {entityName}</td>
        </tr>
      )}
      {/* Empty row to divide table body and table footer */}
      <tr>
        <td colSpan={columns.length}></td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td colSpan={columns.length}>
          <div>
            <div>
              {!!page?.length && (
                <>
                  Showing <strong>{page.length}</strong> {entityName}. Page{' '}
                  <strong>{pageIndex + 1}</strong> of{' '}
                  <strong>{pageCount}</strong>.
                </>
              )}
            </div>
            <div style={{ display: 'flex' }}>
              <S.PaginationButton
                disabled={!canPreviousPage}
                onClick={previousPage}
              >
                <img src="/icons/previous.svg" alt="Previous page"/>
              </S.PaginationButton>
              {renderPagination()}
              <S.PaginationButton disabled={!canNextPage} onClick={nextPage}>
                <img src="/icons/next.svg" alt="Next page"/>
              </S.PaginationButton>
            </div>
          </div>
        </td>
      </tr>
      </tfoot>
    </S.Wrapper>
  )
}

export default Table
