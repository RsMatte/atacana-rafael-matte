import type { Trial } from '@/types';
import type { DataStatus } from '../MainContent/types';

export type TableProps = {
  trials: Trial[];
  status: DataStatus;
};
