import type { FetchTrialsResponse } from '@/types';
import type { FetchTrials } from '../types';
import type { FormValues } from '../../Form/types';

export const fetchTrials = ({
  page,
  formValues,
}: FetchTrials): Promise<FetchTrialsResponse> => {
  const baseUrl = new URL('/api/get', window.location.origin);

  Object.keys(formValues).map((key) => {
    const value = formValues[key as keyof FormValues];
    if (value) baseUrl.searchParams.set(key, value);
  });

  baseUrl.searchParams.set('page', page.toString());

  return fetch(baseUrl, {
    cache: 'force-cache',
    next: { revalidate: 3600 },
  }).then((data) => data.json());
};
