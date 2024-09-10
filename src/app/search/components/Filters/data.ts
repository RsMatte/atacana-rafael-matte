import { Phase, Status } from './types';

export const statusList = [
  { value: '', text: 'Select Status' },
  { value: Status.COMPLETED, text: 'Completed' },
  { value: Status.TERMINATED, text: 'Terminated' },
  { value: Status.WITHDRAWN, text: 'Withdrawn' },
  { value: Status.RECRUITING, text: 'Recruiting' },
  { value: Status.ACTIVE, text: 'Active' },
  { value: Status.APPROVED, text: 'Approved' },
  { value: Status.UNKNOWN, text: 'Unknown' },
];

export const phaseList = [
  { value: '', text: 'Select Phase' },
  { value: Phase.ONE, text: 'Phase 1' },
  { value: Phase.TWO, text: 'Phase 2' },
  { value: Phase.THREE, text: 'Phase 3' },
  { value: Phase.FOUR, text: 'Phase 4' },
];
