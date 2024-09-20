import type { Trial } from '@/types';

export type GetTrials = {
  page: number;
  term?: string;
  status?: string;
  phase?: string;
  date?: string;
};

export type FilterTrials = {
  data: Trial[];
  page: number;
  term: string;
  status: string;
  phase: string;
  date: string;
};
