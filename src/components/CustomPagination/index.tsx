import { useEffect, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { setPage } from './utils';

interface Props {
  items?: any;
  // eslint-disable-next-line no-unused-vars
  onChangePage: (items: any) => void;
  className?: string;
}

interface State {
  totalPages: number;
  startIndex: number;
  endIndex: number;
  currentPage: number;
  pages: number[];
  pageSize: number;
  startPage: number;
  endPage: number;
}

export default function CustomPagination({
  items = [],
  onChangePage,
  className,
}: Props) {
  const [state, setState] = useState<State>({
    totalPages: 0,
    startIndex: 0,
    endIndex: 0,
    currentPage: 1,
    pages: [],
    pageSize: 0,
    startPage: 0,
    endPage: 0,
  });

  const changePage = (page: number) => {
    const { totalPages } = state;
    const pager = setPage(items, page);

    if (page < 1 || page > totalPages) return;

    setState(pager.newState);
    onChangePage(pager.items);
  };

  useEffect(() => {
    const pager = setPage(items);
    setState(pager.newState);
    onChangePage(pager.items);
  }, [items, onChangePage]);

  return state.pages.length ? (
    <Pagination className={`${className}`}>
      <Pagination.First
        disabled={state.currentPage === 1}
        onClick={() => changePage(1)}
      />
      <Pagination.Prev
        disabled={state.currentPage === 1}
        onClick={() => changePage(state.currentPage - 1)}
      />
      {state.pages.map((page) => (
        <Pagination.Item
          key={Math.random()}
          active={state.currentPage === page}
          onClick={() => changePage(page)}
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={state.currentPage === state.totalPages}
        onClick={() => changePage(state.currentPage + 1)}
      />
      <Pagination.Last
        disabled={state.currentPage === state.totalPages}
        onClick={() => changePage(state.totalPages)}
      />
    </Pagination>
  ) : (
    <></>
  );
}
