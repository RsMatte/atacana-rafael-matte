import '@testing-library/jest-dom';
import * as formik from 'formik';
import { fireEvent, render, screen } from '@testing-library/react';
import Form from '../../../../src/app/search/components/Form';
import { values } from '../../search.mock';

const handleChangeMock = jest.fn();
const handleResetMock = jest.fn();

describe('Form component', () => {
  beforeEach(() =>
    jest
      .spyOn(formik, 'useFormikContext')
      // @ts-expect-error: We only need some parameters from formik
      .mockReturnValue({
        values,
        handleChange: handleChangeMock,
        handleReset: handleResetMock,
      }),
  );

  it('should call handleChange function correctly', async () => {
    render(<Form resetData={jest.fn()} />);

    const searchInput = screen.getByTestId('search-input');
    const dateInput = screen.getByTestId('date-input');
    const statusSelect = screen.getByTestId('status-select');
    const phaseSelect = screen.getByTestId('phase-select');

    fireEvent.change(searchInput, { target: { value: 'new value' } });
    fireEvent.change(dateInput, { target: { value: '2020-05-24' } });
    fireEvent.change(statusSelect, { target: { value: 'Completed' } });
    fireEvent.change(phaseSelect, { target: { value: '1' } });

    expect(handleChangeMock).toHaveBeenCalledTimes(4);
  });

  it('should call handleChange function correctly', async () => {
    const resetDataMock = jest.fn();
    render(<Form resetData={resetDataMock} />);

    const resetButton = screen.getByTestId('reset-button');

    fireEvent.click(resetButton);

    expect(handleResetMock).toHaveBeenCalled();
    expect(resetDataMock).toHaveBeenCalled();
  });
});
