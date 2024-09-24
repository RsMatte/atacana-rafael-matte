import type { Trial } from '@/types';

export type GetTrials = {
  page: number;
  term?: string;
  status?: string;
  phase?: string;
  from?: string;
  to?: string;
};

export type FilterTrials = {
  data: Trial[];
  page: number;
  term: string;
  status: string;
  phase: string;
  from?: string;
  to?: string;
};
