import { tableHeaders } from './data';
import type { TableProps } from './types';

const Table = ({ trialsData }: TableProps) => {
  return (
    <table>
      <thead>
        <tr>
          {tableHeaders.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {trialsData.map((trial) => (
          <tr key={trial.trialCode}>
            <td>{trial.trialCode}</td>
            <td>{trial.trialAcronym}</td>
            <td>{trial.trialTitle}</td>
            <td>{trial.trialUrl}</td>
            <td>{trial.trialPhase}</td>
            <td>{trial.trialStatus}</td>
            <td>{trial.trialCompletionDate}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
