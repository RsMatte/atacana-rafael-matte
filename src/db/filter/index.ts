import { getData } from '../client';

const LIMIT = 10;

type GetFilteredData = {
  status?: string | null;
  phase?: string | null;
  page: number;
};

export const getFilteredData = async ({
  status,
  phase,
  page = 1,
}: GetFilteredData) => {
  const data = await getData();

  const filteredData = [];

  let count = 0;
  const lowerLimit = (page - 1) * LIMIT;
  const higherLimit = page * LIMIT;

  for (let i = 0; i < data.length; i++) {
    if (count === higherLimit) break;

    if (
      (!phase || data[i].trialPhase.includes(phase)) &&
      (!status || data[i].trialStatus.includes(status))
    ) {
      filteredData.push(data[i]);
      count++;
    }
  }

  return filteredData.slice(lowerLimit, higherLimit);
};
