export type Trial = {
  trialCode: string;
  trialAcronym: string;
  trialTitle: string;
  trialUrl: string;
  trialPhase: string;
  trialStatus: string;
  trialCompletionDate: string;
};

export type FetchTrialsResponse = {
  count: number;
  trials: Trial[];
};
