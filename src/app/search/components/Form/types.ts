export type FormProps = {
  resetData: () => void;
};

export type FormValues = {
  term: string;
  status: string;
  phase: string;
  date: string;
};

export enum Status {
  COMPLETED = 'Completed',
  TERMINATED = 'Terminated',
  WITHDRAWN = 'Withdrawn',
  RECRUITING = 'Recruiting',
  ACTIVE = 'Active',
  APPROVED = 'Approved',
  UNKNOWN = 'Unknown',
}

export enum Phase {
  ONE = '1',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
}
