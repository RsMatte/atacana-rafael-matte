import './styles.css';

import { FormikContextType, useFormikContext } from 'formik';

import type { PaginationProps } from './types';
import type { FormValues } from '../Form/types';
import { useMemo } from 'react';

const firstPage = 1;
const limit = 10;

const Pagination = ({
  clickPreviousPage,
  clickNextPage,
  currentPage,
  trialsData,
  status,
}: PaginationProps) => {
  const { values }: FormikContextType<FormValues> = useFormikContext();
  const { count, trials } = trialsData;

  const isLoading = status === 'loading';
  const isPreviousPageDisabled = useMemo(
    () => isLoading || currentPage === firstPage,
    [currentPage, isLoading],
  );
  const isNextPageDisabled = useMemo(
    () => isLoading || count <= currentPage * limit,
    [count, currentPage, isLoading],
  );
  const totalPages = useMemo(() => Math.ceil(count / limit) || 1, [count]);

  const intervalLabel = useMemo(() => {
    if (trials.length === 0) return 'showing 0 results';

    const lowerInterval = (currentPage - 1) * limit + 1;
    const higherInterval = lowerInterval + trials.length - 1;

    return `showing ${lowerInterval} - ${higherInterval} of ${count} results`;
  }, [count, currentPage, trials.length]);

  return (
    <div className="pagination">
      <div className="pagination-buttons">
        <button
          disabled={isPreviousPageDisabled}
          onClick={() => clickPreviousPage(values)}
        >
          ‹
        </button>
        <span>
          page {currentPage} of {totalPages}
        </span>
        <button
          disabled={isNextPageDisabled}
          onClick={() => clickNextPage(values)}
        >
          ›
        </button>
      </div>
      <span className="pagination-results">{intervalLabel}</span>
    </div>
  );
};

export default Pagination;
