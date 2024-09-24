import type { FetchTrialsResponse } from '@/types';
import type { GetTrials } from './types';
import { getData } from '../client';
import { findTrialByCode, filterTrials } from './functions';

const codeRegex = new RegExp('^NCT[0-9]{8}$');

export const getTrials = async ({
  page,
  term = '',
  status = '',
  phase = '',
  from = '',
  to = '',
}: GetTrials): Promise<FetchTrialsResponse> => {
  const data = await getData();

  if (term.match(codeRegex)) return findTrialByCode(data, term);

  return filterTrials({ data, term, page, status, phase, from, to });
};
