/**
 * @jest-environment node
 */

import { getData } from '../../src/db/client';
import * as fs from 'fs';

jest.mock('fs');

describe('read csv file', () => {
  beforeEach(() => jest.clearAllMocks());

  it('should return empty list if read file launches an exception', async () => {
    // @ts-expect-error: We only need some functions from createReadStream
    jest.spyOn(fs, 'createReadStream').mockReturnValue({
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation(function (event, handler) {
        if (event === 'error') {
          handler('error');
        }

        // @ts-expect-error: The correct this is being used
        return this;
      }),
    });

    const data = await getData();

    expect(data).toEqual([]);
  });

  it('should read the file correctly', async () => {
    // @ts-expect-error: We only need some functions from createReadStream
    jest.spyOn(fs, 'createReadStream').mockReturnValue({
      pipe: jest.fn().mockReturnThis(),
      on: jest.fn().mockImplementation(function (event, handler) {
        if (event === 'data' || event === 'end') {
          handler({ row: 'mockRow' });
        }

        // @ts-expect-error: The correct this is being used
        return this;
      }),
    });

    const data = await getData();

    expect(data).toEqual([{ row: 'mockRow' }]);
  });
});
