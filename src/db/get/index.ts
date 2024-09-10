import { getData } from '../client';

export const getTrialByCode = async ({ code }: { code: string }) => {
  const data = await getData();

  return data.find((elem) => elem.trialCode === code);
};
