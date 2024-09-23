/**
 * @jest-environment node
 */

import { getTrials } from '../../src/db/get';
import SearchPage from '../../src/app/search/page';

jest.mock('../../src/db/get');

const getTrialsFile = { getTrials };

describe('Search page', () => {
  it('renders the title', async () => {
    jest.spyOn(getTrialsFile, 'getTrials').mockResolvedValue({
      count: 1,
      trials: [],
    });

    const page = await SearchPage();

    expect(page.props.children.length).toEqual(3);
  });
});
