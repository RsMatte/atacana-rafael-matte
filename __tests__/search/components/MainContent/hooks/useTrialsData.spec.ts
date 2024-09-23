import '@testing-library/jest-dom';
import useTrialsData from '../../../../../src/app/search/components/MainContent/hooks/useTrialsData';
import { renderHook, waitFor } from '@testing-library/react';
import * as fetchTrials from '../../../../../src/app/search/components/MainContent/api/api';
import { fetchResponse, trialsData, values } from '../../../search.mock';

jest.mock('../../../../../src/app/search/components/MainContent/api/api');

describe('useTrialsData hook', () => {
  it('should return correct values', async () => {
    const { result } = renderHook(() =>
      useTrialsData({ initialData: trialsData }),
    );

    const { currentPage, status, data } = result.current;

    expect(currentPage).toBe(1);
    expect(status).toEqual('success');
    expect(data).toEqual(trialsData);
  });

  it('should return correct values on form submit successfully', async () => {
    const fetchMock = jest
      .spyOn(fetchTrials, 'fetchTrials')
      .mockResolvedValue(fetchResponse);
    const { result } = renderHook(() =>
      useTrialsData({ initialData: trialsData }),
    );

    await waitFor(() => result.current.handleFormSubmit(values));

    expect(fetchMock).toHaveBeenCalledWith({ formValues: values, page: 1 });
    expect(result.current.status).toEqual('success');
    expect(result.current.currentPage).toBe(1);
    expect(result.current.data).toBe(fetchResponse);
  });

  it('should return correct values when form submit fails', async () => {
    const fetchMock = jest
      .spyOn(fetchTrials, 'fetchTrials')
      .mockRejectedValue('error');
    const { result } = renderHook(() =>
      useTrialsData({ initialData: trialsData }),
    );
    const { handleFormSubmit } = result.current;

    await waitFor(() => handleFormSubmit(values));

    expect(fetchMock).toHaveBeenCalledWith({ formValues: values, page: 1 });
    expect(result.current.status).toEqual('error');
  });

  it('should return correct values when next page is clicked', async () => {
    const fetchMock = jest
      .spyOn(fetchTrials, 'fetchTrials')
      .mockResolvedValue(fetchResponse);
    const { result } = renderHook(() =>
      useTrialsData({ initialData: trialsData }),
    );
    const { clickNextPage } = result.current;

    await waitFor(() => clickNextPage(values));

    expect(fetchMock).toHaveBeenCalledWith({ formValues: values, page: 2 });
    expect(result.current.currentPage).toBe(2);
    expect(result.current.data).toBe(fetchResponse);
  });

  it('should return correct values when previous page is clicked', async () => {
    const fetchMock = jest
      .spyOn(fetchTrials, 'fetchTrials')
      .mockResolvedValue(fetchResponse);
    const { result } = renderHook(() =>
      useTrialsData({ initialData: trialsData }),
    );
    const { clickPreviousPage } = result.current;

    await waitFor(() => clickPreviousPage(values));

    expect(fetchMock).toHaveBeenCalledWith({ formValues: values, page: 0 });
    expect(result.current.currentPage).toBe(0);
    expect(result.current.data).toBe(fetchResponse);
  });

  it('should reset all the values when resetData is called', async () => {
    jest.spyOn(fetchTrials, 'fetchTrials').mockResolvedValue(fetchResponse);
    const { result } = renderHook(() =>
      useTrialsData({ initialData: trialsData }),
    );
    const { clickNextPage, resetData } = result.current;

    await waitFor(() => clickNextPage(values));
    await waitFor(() => resetData());

    expect(result.current.currentPage).toBe(1);
    expect(result.current.data).toBe(trialsData);
    expect(result.current.status).toBe('success');
  });
});
