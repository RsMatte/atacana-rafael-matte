import './styles.css';

import { FormikContextType, useFormikContext } from 'formik';

import type { PaginationProps } from './types';
import type { FormValues } from '../Form/types';

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
  const isPreviousPageDisabled = isLoading || currentPage === firstPage;
  const isNextPageDisabled = isLoading || count <= currentPage * limit;
  const totalPages = Math.ceil(count / limit) || 1;

  const getIntervalLabel = () => {
    if (trials.length === 0) return 'showing 0 results';

    const lowerInterval = (currentPage - 1) * limit + 1;
    const higherInterval = lowerInterval + trials.length - 1;

    return `showing ${lowerInterval} - ${higherInterval} of ${count} results`;
  };

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
      <span className="pagination-results">{getIntervalLabel()}</span>
    </div>
  );
};

export default Pagination;
