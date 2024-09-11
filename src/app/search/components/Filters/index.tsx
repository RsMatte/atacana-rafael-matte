import './styles.css';

import { phaseList, statusList } from './data';
import useFilters from './hooks/useFilters';
import type { FilterProps } from './types';

const Filters = ({
  isNextPageDisabled,
  updateData,
  resetData,
}: FilterProps) => {
  const {
    status,
    phase,
    inputElement,
    handleSearchSubmit,
    handleStatusChange,
    handlePhaseChange,
    clickPreviousPage,
    clickNextPage,
    isPreviousPageDisabled,
    resetFilters,
  } = useFilters({ updateData, resetData });

  return (
    <div className="filter">
      <form className="filter-form" onSubmit={handleSearchSubmit}>
        <label htmlFor="code">Search by code:</label>
        <input
          id="code"
          name="code"
          type="text"
          placeholder="NCT00000000"
          ref={inputElement}
          pattern="NCT[0-9]{8}"
          required
        />
        <button className="button-primary">Search</button>
      </form>

      <div className="filter-select">
        <select value={status} onChange={handleStatusChange} name="status">
          {statusList.map((sts) => (
            <option key={sts.text} value={sts.value}>
              {sts.text}
            </option>
          ))}
        </select>

        <select value={phase} onChange={handlePhaseChange} name="phase">
          {phaseList.map((phs) => (
            <option key={phs.text} value={phs.value}>
              {phs.text}
            </option>
          ))}
        </select>
        <button className="button-primary" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <div className="filter-pagination">
        <button
          className="button-secondary"
          disabled={isPreviousPageDisabled}
          onClick={clickPreviousPage}
        >
          ‹
        </button>
        <button
          className="button-secondary"
          disabled={isNextPageDisabled}
          onClick={clickNextPage}
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default Filters;
