import type { Trial } from '@/types';
import type { FilterTrials } from './types';

const LIMIT = 10;

export const findTrialByCode = async (data: Trial[], term: string) => {
  const trial = data.find((elem) => elem.trialCode === term);

  if (!trial) return { trials: [], count: 0 };

  return { trials: [trial], count: 1 };
};

export const filterTrials = async ({
  data,
  page,
  term,
  status,
  phase,
  from,
  to,
}: FilterTrials) => {
  const filteredData = [];

  const lowerLimit = (page - 1) * LIMIT;
  const higherLimit = page * LIMIT;

  const lowerCasedTerm = term.toLowerCase();
  const fromDateFormatted =
    from && !isNaN(Date.parse(from)) ? new Date(from) : '';
  const toDateFormatted = to && !isNaN(Date.parse(to)) ? new Date(to) : '';

  for (let i = 0; i < data.length; i++) {
    if (
      (!phase || data[i].trialPhase.includes(phase)) &&
      (!status || data[i].trialStatus.includes(status)) &&
      (!fromDateFormatted ||
        new Date(data[i].trialCompletionDate) > fromDateFormatted) &&
      (!toDateFormatted ||
        new Date(data[i].trialCompletionDate) < toDateFormatted) &&
      (!term ||
        data[i].trialTitle.toLowerCase().includes(lowerCasedTerm) ||
        data[i].trialAcronym.toLowerCase().includes(lowerCasedTerm) ||
        data[i].trialCode.toLowerCase().includes(lowerCasedTerm))
    ) {
      filteredData.push(data[i]);
    }
  }

  return {
    count: filteredData.length,
    trials: filteredData.slice(lowerLimit, higherLimit),
  };
};
