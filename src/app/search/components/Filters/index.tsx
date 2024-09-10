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
    <>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for Trial Code"
          ref={inputElement}
          required
        />
        <button>Search</button>
      </form>

      <div>
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
      </div>

      <div>
        <button disabled={isPreviousPageDisabled} onClick={clickPreviousPage}>
          previous page {'<'}
        </button>
        <button disabled={isNextPageDisabled} onClick={clickNextPage}>
          next page {'>'}
        </button>
      </div>
      <button onClick={resetFilters}>Reset Filters</button>
    </>
  );
};

export default Filters;
