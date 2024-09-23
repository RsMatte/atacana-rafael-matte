import '@testing-library/jest-dom';
import * as useTrialsData from '../../../../src/app/search/components/MainContent/hooks/useTrialsData';
import * as formik from 'formik';
import { render } from '@testing-library/react';
import MainContent from '../../../../src/app/search/components/MainContent';
import { trialsData } from '../../search.mock';

jest.mock(
  '../../../../src/app/search/components/MainContent/hooks/useTrialsData',
);

const handleFormSubmitMock = jest.fn();

describe('MainContent component', () => {
  it('should render MainContent correctly', async () => {
    jest.spyOn(useTrialsData, 'default').mockReturnValue({
      handleFormSubmit: handleFormSubmitMock,
      clickPreviousPage: jest.fn(),
      clickNextPage: jest.fn(),
      resetData: jest.fn(),
      currentPage: 1,
      data: trialsData,
      status: 'success',
    }),
      jest
        .spyOn(formik, 'Formik')
        // @ts-expect-error: We don't need every function from formik
        .mockImplementationOnce((f) => f.onSubmit({}, {}));

    render(<MainContent initialData={trialsData} />);

    expect(handleFormSubmitMock).toHaveBeenCalled();
  });
});
