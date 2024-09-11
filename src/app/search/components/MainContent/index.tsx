'use client';

import { useState } from 'react';
import Table from '../Table';
import Filters from '../Filters';
import type { MainContentProps } from './types';
import type { Trial } from '@/types';

const limit = 10;

const MainContent = ({ initialData }: MainContentProps) => {
  const [trialsData, setTrialsData] = useState(initialData);

  const updateData = (data: Trial[]) => setTrialsData(data);
  const resetData = () => setTrialsData(initialData);
  const isNextPageDisabled = trialsData.length < limit;

  return (
    <>
      <Filters
        isNextPageDisabled={isNextPageDisabled}
        updateData={updateData}
        resetData={resetData}
      />
      <Table trialsData={trialsData} />
    </>
  );
};

export default MainContent;
