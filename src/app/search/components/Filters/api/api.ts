import { Trial } from '@/types';
import type { FetchTrialByCode, FetchTrialList } from '../types';

export const fetchTrialByCode = ({
  code,
}: FetchTrialByCode): Promise<Trial> => {
  return fetch(`/api/get?code=${code}`, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  }).then((data) => data.json());
};

export const fetchTrialList = ({
  page = 1,
  status,
  phase,
}: FetchTrialList): Promise<Trial[]> => {
  const baseUrl = new URL('/api/filter', window.location.origin);
  baseUrl.searchParams.set('page', page.toString());
  if (status) baseUrl.searchParams.set('status', status);
  if (phase) baseUrl.searchParams.set('phase', phase);

  return fetch(baseUrl, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  }).then((data) => data.json());
};
