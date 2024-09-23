/**
 * @jest-environment node
 */

import { filterTrials, findTrialByCode } from '../../../src/db/get/functions';
import { dbData } from '../db.mock';

describe('db functions', () => {
  it('should return correct data when calling findTrialByCode function', async () => {
    const response = await findTrialByCode(dbData, dbData[0].trialCode);

    expect(response).toEqual({ trials: [dbData[0]], count: 1 });
  });

  it('should return empty when findTrialByCode function cant find data', async () => {
    const response = await findTrialByCode(dbData, 'term');

    expect(response).toEqual({ trials: [], count: 0 });
  });

  it('should return correct data when calling filterTrials function with term', async () => {
    const response = await filterTrials({
      data: dbData,
      page: 1,
      term: 'NCT00',
      status: '',
      phase: '',
      date: '',
    });

    expect(response).toEqual({ trials: dbData, count: 3 });
  });

  it('should return correct data when calling filterTrials function with phase and status', async () => {
    const response = await filterTrials({
      data: dbData,
      page: 1,
      term: '',
      status: 'Terminated',
      phase: '1',
      date: '',
    });

    expect(response).toEqual({ trials: [dbData[2]], count: 1 });
  });

  it('should return correct data when calling filterTrials function with date', async () => {
    const response = await filterTrials({
      data: dbData,
      page: 1,
      term: '',
      status: '',
      phase: '',
      date: '2006-1-1',
    });

    expect(response).toEqual({ trials: [dbData[1]], count: 1 });
  });
});
