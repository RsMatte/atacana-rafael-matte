import { Trial } from '@/app/types';

export type FilterProps = {
  isNextPageDisabled: boolean;
  updateData: (data: Trial[]) => void;
  resetData: () => void;
};

export type UseFilterProps = {
  updateData: (data: Trial[]) => void;
  resetData: () => void;
};

export type FetchTrialList = {
  page?: number;
  status?: string;
  phase?: string;
};

export type FetchTrialByCode = {
  code: string;
};

export enum Status {
  COMPLETED = 'Completed',
  TERMINATED = 'Terminated',
  WITHDRAWN = 'Withdrawn',
  RECRUITING = 'Recruiting',
  ACTIVE = 'Active',
  APPROVED = 'Approved',
  UNKNOWN = 'Unknown',
}

export enum Phase {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
}
