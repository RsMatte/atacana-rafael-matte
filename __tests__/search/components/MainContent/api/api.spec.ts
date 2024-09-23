import '@testing-library/jest-dom';
import { fetchTrials } from '../../../../../src/app/search/components/MainContent/api/api';
import { trialsData, values } from '../../../search.mock';
import { waitFor } from '@testing-library/react';

const fetchMock = jest.fn().mockResolvedValue({ json: () => trialsData });

global.fetch = fetchMock;

describe('fetchTrials function', () => {
  it('should call fetch correctly', async () => {
    const apiMock = await waitFor(() =>
      fetchTrials({ page: 1, formValues: values }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(apiMock).toEqual(trialsData);
  });
});
