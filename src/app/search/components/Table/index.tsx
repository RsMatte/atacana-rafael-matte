import './styles.css';
import { tableHeaders } from './data';
import type { TableProps } from './types';

const Table = ({ trialsData }: TableProps) => {
  if (trialsData.length === 0) return <p>No data found</p>;

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            {tableHeaders.map((header) => (
              <th
                key={header}
                {...(header === 'Acronym'
                  ? { className: 'table-acronym' }
                  : {})}
                {...(header === 'Complete'
                  ? { className: 'table-complete' }
                  : {})}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {trialsData.map((trial) => (
            <tr key={trial.trialCode}>
              <td>{trial.trialCode}</td>
              <td className="table-title">{trial.trialTitle}</td>
              <td>{trial.trialPhase}</td>
              <td>{trial.trialStatus}</td>
              <td className="table-complete">{trial.trialCompletionDate}</td>
              <td>
                <a href={trial.trialUrl} target="_blank">
                  Details
                </a>
              </td>
              <td className="table-acronym">{trial.trialAcronym}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
