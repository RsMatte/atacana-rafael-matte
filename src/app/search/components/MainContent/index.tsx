'use client';

import { Formik } from 'formik';

import useTrialsData from './hooks/useTrialsData';
import type { MainContentProps } from './types';
import Pagination from '../Pagination';
import Table from '../Table';
import Form from '../Form';
import { initialValues } from '../Form/data';

const MainContent = ({ initialData }: MainContentProps) => {
  const {
    handleFormSubmit,
    clickPreviousPage,
    clickNextPage,
    resetData,
    currentPage,
    data,
    status,
  } = useTrialsData({ initialData });

  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      <>
        <Form resetData={resetData} />
        <Table trials={data.trials} status={status} />
        <Pagination
          clickPreviousPage={clickPreviousPage}
          clickNextPage={clickNextPage}
          currentPage={currentPage}
          trialsData={data}
          status={status}
        />
      </>
    </Formik>
  );
};

export default MainContent;
