import { useState } from 'react';
import { fetchTrials } from '../api/api';
import { DataStatus, UseTrialsDataProps } from '../types';
import { FormValues } from '../../Form/types';

const firstPage = 1;

const useTrialsData = ({ initialData }: UseTrialsDataProps) => {
  const [currentPage, setCurrentPage] = useState(firstPage);
  const [data, setData] = useState(initialData);
  const [status, setStatus] = useState<DataStatus>('success');

  const fetchNewData = (values: FormValues, page: number) => {
    setStatus('loading');
    fetchTrials({ formValues: values, page })
      .then((response) => {
        setData(response);
        setCurrentPage(page);
        setStatus('success');
      })
      .catch((e) => {
        console.log(e);
        setStatus('error');
      });
  };

  const handleFormSubmit = (values: FormValues) =>
    fetchNewData(values, firstPage);

  const clickNextPage = (values: FormValues) =>
    fetchNewData(values, currentPage + 1);

  const clickPreviousPage = (values: FormValues) =>
    fetchNewData(values, currentPage - 1);

  const resetData = () => {
    setCurrentPage(firstPage);
    setData(initialData);
    setStatus('success');
  };

  return {
    handleFormSubmit,
    clickPreviousPage,
    clickNextPage,
    resetData,
    currentPage,
    data,
    status,
  };
};

export default useTrialsData;
