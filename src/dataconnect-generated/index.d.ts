import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Candidate_Key {
  id: UUIDString;
  __typename?: 'Candidate_Key';
}

export interface CastVoteData {
  vote_insert: Vote_Key;
}

export interface CastVoteVariables {
  electionId: UUIDString;
  positionId: UUIDString;
  candidateId: UUIDString;
}

export interface CreateElectionData {
  election_insert: Election_Key;
}

export interface CreateElectionVariables {
  title: string;
  description: string;
  startDate: TimestampString;
  endDate: TimestampString;
  status: string;
}

export interface Election_Key {
  id: UUIDString;
  __typename?: 'Election_Key';
}

export interface GetUserRoleData {
  user?: {
    role: string;
  };
}

export interface GetUserRoleVariables {
  id: UUIDString;
}

export interface ListAvailableElectionsData {
  elections: ({
    id: UUIDString;
    title: string;
    description: string;
    startDate: TimestampString;
    endDate: TimestampString;
  } & Election_Key)[];
}

export interface Position_Key {
  id: UUIDString;
  __typename?: 'Position_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

export interface Vote_Key {
  voterId: UUIDString;
  positionId: UUIDString;
  electionId: UUIDString;
  __typename?: 'Vote_Key';
}

interface CreateElectionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateElectionVariables): MutationRef<CreateElectionData, CreateElectionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateElectionVariables): MutationRef<CreateElectionData, CreateElectionVariables>;
  operationName: string;
}
export const createElectionRef: CreateElectionRef;

export function createElection(vars: CreateElectionVariables): MutationPromise<CreateElectionData, CreateElectionVariables>;
export function createElection(dc: DataConnect, vars: CreateElectionVariables): MutationPromise<CreateElectionData, CreateElectionVariables>;

interface ListAvailableElectionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableElectionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableElectionsData, undefined>;
  operationName: string;
}
export const listAvailableElectionsRef: ListAvailableElectionsRef;

export function listAvailableElections(): QueryPromise<ListAvailableElectionsData, undefined>;
export function listAvailableElections(dc: DataConnect): QueryPromise<ListAvailableElectionsData, undefined>;

interface CastVoteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CastVoteVariables): MutationRef<CastVoteData, CastVoteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CastVoteVariables): MutationRef<CastVoteData, CastVoteVariables>;
  operationName: string;
}
export const castVoteRef: CastVoteRef;

export function castVote(vars: CastVoteVariables): MutationPromise<CastVoteData, CastVoteVariables>;
export function castVote(dc: DataConnect, vars: CastVoteVariables): MutationPromise<CastVoteData, CastVoteVariables>;

interface GetUserRoleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserRoleVariables): QueryRef<GetUserRoleData, GetUserRoleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserRoleVariables): QueryRef<GetUserRoleData, GetUserRoleVariables>;
  operationName: string;
}
export const getUserRoleRef: GetUserRoleRef;

export function getUserRole(vars: GetUserRoleVariables): QueryPromise<GetUserRoleData, GetUserRoleVariables>;
export function getUserRole(dc: DataConnect, vars: GetUserRoleVariables): QueryPromise<GetUserRoleData, GetUserRoleVariables>;

