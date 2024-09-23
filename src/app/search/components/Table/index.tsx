import './styles.css';
import { tableHeaders } from './data';
import type { TableProps } from './types';

const Table = ({ trials, status }: TableProps) => {
  const isLoading = status === 'loading';
  const hasError = status === 'error';

  if (isLoading)
    return (
      <div data-testid="table-skeleton" className="skeleton-wrapper">
        <div className="table-skeleton" />
      </div>
    );

  if (hasError)
    return (
      <div data-testid="table-error" className="status-wrapper">
        <span>Error fetching trials, please try again later</span>
      </div>
    );

  if (trials.length === 0)
    return (
      <div data-testid="table-empty-data-message" className="status-wrapper">
        <span>No data found. Try different filters</span>
      </div>
    );

  return (
    <div className="table-wrapper">
      <table data-testid="main-table" className="table">
        <thead>
          <tr className="table-header">
            {tableHeaders.map((header) => (
              <th key={header} className={`table-${header.toLowerCase()}`}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trials.map((trial) => (
            <tr key={trial.trialCode}>
              <td>{trial.trialCode}</td>
              <td>{trial.trialTitle}</td>
              <td>{trial.trialPhase}</td>
              <td>{trial.trialStatus}</td>
              <td className="table-complete">{trial.trialCompletionDate}</td>
              <td className="table-acronym">{trial.trialAcronym}</td>
              <td>
                <a href={trial.trialUrl} target="_blank">
                  Details
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
