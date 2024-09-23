/**
 * @jest-environment node
 */

import { getTrials } from '../../../src/db/get';
import * as filterTrials from '../../../src/db/get/functions';
import * as getData from '../../../src/db/client';
import { dbData, params } from '../db.mock';

jest.mock('../../../src/db/client');
jest.mock('../../../src/db/get/functions');

describe('getTrials function', () => {
  it('should work correctly when all parameters are passed', async () => {
    jest.spyOn(getData, 'getData').mockResolvedValue(dbData);
    const filterTrialsMock = jest.spyOn(filterTrials, 'filterTrials');

    await getTrials(params);

    expect(filterTrialsMock).toHaveBeenCalledWith({ data: dbData, ...params });
  });

  it('should work correctly when only page is passed', async () => {
    jest.spyOn(getData, 'getData').mockResolvedValue(dbData);
    const filterTrialsMock = jest.spyOn(filterTrials, 'filterTrials');

    await getTrials({ page: 1 });

    expect(filterTrialsMock).toHaveBeenCalledWith({
      data: dbData,
      page: 1,
      date: '',
      status: '',
      term: '',
      phase: '',
    });
  });

  it('should try to find a single trial when term matches the code regex', async () => {
    jest.spyOn(getData, 'getData').mockResolvedValue(dbData);
    const findTrialByCodeMock = jest.spyOn(filterTrials, 'findTrialByCode');

    await getTrials({ page: 1, term: 'NCT00197405' });

    expect(findTrialByCodeMock).toHaveBeenCalledWith(dbData, 'NCT00197405');
  });
});
