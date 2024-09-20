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

  const isLoading = status === 'loading';
  const isPreviousPageDisabled = isLoading || currentPage === firstPage;
  const isNextPageDisabled = isLoading || trialsData.trials.length < limit;

  return (
    <div className="filter-pagination">
      <button
        className="button-secondary"
        disabled={isPreviousPageDisabled}
        onClick={() => clickPreviousPage(values)}
      >
        ‹
      </button>
      <button
        className="button-secondary"
        disabled={isNextPageDisabled}
        onClick={() => clickNextPage(values)}
      >
        ›
      </button>
    </div>
  );
};

export default Pagination;
