import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Table from '../../../../src/app/search/components/Table';
import { trials } from '../../search.mock';

describe('Table component', () => {
  it('should render the skeleton when status is loading', async () => {
    render(<Table status="loading" trials={trials} />);

    const skeleton = screen.getByTestId('table-skeleton');

    expect(skeleton).toBeInTheDocument();
  });

  it('should render the error message when status is error', async () => {
    render(<Table status="error" trials={trials} />);

    const errorComponent = screen.getByTestId('table-error');

    expect(errorComponent).toBeInTheDocument();
  });

  it('should render the empty data message when trials length is zero', async () => {
    render(<Table status="success" trials={[]} />);

    const emptyDataComponent = screen.getByTestId('table-empty-data-message');

    expect(emptyDataComponent).toBeInTheDocument();
  });

  it('should render the table correctly when status is success and data has positive length', async () => {
    render(<Table status="success" trials={trials} />);

    const tableComponent = screen.getByTestId('main-table');

    expect(tableComponent).toBeInTheDocument();
  });
});
