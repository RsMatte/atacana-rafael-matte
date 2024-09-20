import type { FetchTrialsResponse } from '@/types';
import type { FormValues } from '../Form/types';

export type MainContentProps = {
  initialData: FetchTrialsResponse;
};

export type UseTrialsDataProps = {
  initialData: FetchTrialsResponse;
};

export type FetchTrials = {
  page: number;
  formValues: FormValues;
};

export type DataStatus = 'success' | 'error' | 'loading';
