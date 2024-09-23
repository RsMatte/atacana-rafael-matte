import '@testing-library/jest-dom';
import * as formik from 'formik';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../../../../src/app/search/components/Pagination';
import { trialsData, values } from '../../search.mock';

describe('Pagination component', () => {
  beforeEach(() =>
    // @ts-expect-error: We only need values from formik
    jest.spyOn(formik, 'useFormikContext').mockReturnValue({ values }),
  );

  it('should render correctly with 5 results', async () => {
    render(
      <Pagination
        clickPreviousPage={jest.fn()}
        clickNextPage={jest.fn()}
        currentPage={1}
        trialsData={trialsData}
        status="success"
      />,
    );

    const intervalLabel = screen.getByText('showing 1 - 5 of 5 results');
    const pageLabel = screen.getByText('page 1 of 1');
    const previousPageButton = screen.getByTestId('previous-page-button');
    const nextPageButton = screen.getByTestId('next-page-button');

    expect(intervalLabel).toBeInTheDocument();
    expect(pageLabel).toBeInTheDocument();
    expect(previousPageButton).toHaveAttribute('disabled');
    expect(nextPageButton).toHaveAttribute('disabled');
  });

  it('should render correctly with 0 results', async () => {
    render(
      <Pagination
        clickPreviousPage={jest.fn()}
        clickNextPage={jest.fn()}
        currentPage={1}
        trialsData={{ trials: [], count: 0 }}
        status="success"
      />,
    );

    const intervalLabel = screen.getByText('showing 0 results');
    const pageLabel = screen.getByText('page 1 of 1');
    const previousPageButton = screen.getByTestId('previous-page-button');
    const nextPageButton = screen.getByTestId('next-page-button');

    expect(intervalLabel).toBeInTheDocument();
    expect(pageLabel).toBeInTheDocument();
    expect(previousPageButton).toHaveAttribute('disabled');
    expect(nextPageButton).toHaveAttribute('disabled');
  });

  it('should render both buttons disabled when status is loading', async () => {
    render(
      <Pagination
        clickPreviousPage={jest.fn()}
        clickNextPage={jest.fn()}
        currentPage={1}
        trialsData={trialsData}
        status="loading"
      />,
    );

    const previousPageButton = screen.getByTestId('previous-page-button');
    const nextPageButton = screen.getByTestId('next-page-button');

    expect(previousPageButton).toHaveAttribute('disabled');
    expect(nextPageButton).toHaveAttribute('disabled');
  });

  it('should trigger function correctly when next page button is pressed', async () => {
    const onNextButtonClick = jest.fn();

    render(
      <Pagination
        clickPreviousPage={jest.fn()}
        clickNextPage={onNextButtonClick}
        currentPage={2}
        trialsData={{ ...trialsData, count: 50 }}
        status="success"
      />,
    );

    const nextPageButton = screen.getByTestId('next-page-button');
    fireEvent.click(nextPageButton);

    expect(onNextButtonClick).toHaveBeenCalledWith(values);
  });

  it('should trigger function correctly when previous page button is pressed', async () => {
    const onPreviousButtonClick = jest.fn();

    render(
      <Pagination
        clickPreviousPage={onPreviousButtonClick}
        clickNextPage={jest.fn()}
        currentPage={2}
        trialsData={{ ...trialsData, count: 50 }}
        status="success"
      />,
    );

    const previousPageButton = screen.getByTestId('previous-page-button');
    fireEvent.click(previousPageButton);

    expect(onPreviousButtonClick).toHaveBeenCalledWith(values);
  });
});
