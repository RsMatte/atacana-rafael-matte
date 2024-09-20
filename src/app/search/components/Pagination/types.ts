import type { FetchTrialsResponse } from '@/types';
import type { FormValues } from '../Form/types';
import type { DataStatus } from '../MainContent/types';

export type PaginationProps = {
  clickPreviousPage: (values: FormValues) => void;
  clickNextPage: (values: FormValues) => void;
  currentPage: number;
  trialsData: FetchTrialsResponse;
  status: DataStatus;
};
