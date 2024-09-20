import type { Trial } from '@/types';
import type { FilterTrials } from './types';

const LIMIT = 10;

const formatDate = (date: string) => {
  const [year, month, day] = date.split('-');
  if (!month || !day || !year) return '';
  return `${month.replace('0', '')}/${day.replace('0', '')}/${year}`;
};

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
  date,
}: FilterTrials) => {
  const filteredData = [];

  const lowerLimit = (page - 1) * LIMIT;
  const higherLimit = page * LIMIT;

  const lowerCasedTerm = term.toLowerCase();
  const dateFormatted = formatDate(date);

  for (let i = 0; i < data.length; i++) {
    if (
      (!phase || data[i].trialPhase.includes(phase)) &&
      (!status || data[i].trialStatus.includes(status)) &&
      (!dateFormatted || data[i].trialCompletionDate.includes(dateFormatted)) &&
      (!term ||
        data[i].trialTitle.toLowerCase().includes(lowerCasedTerm) ||
        data[i].trialAcronym.toLowerCase().includes(lowerCasedTerm))
    ) {
      filteredData.push(data[i]);
    }
  }

  return {
    count: filteredData.length,
    trials: filteredData.slice(lowerLimit, higherLimit),
  };
};
