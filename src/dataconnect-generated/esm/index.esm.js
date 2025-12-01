import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'example',
  service: 'voting-app',
  location: 'us-east4'
};

export const createElectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateElection', inputVars);
}
createElectionRef.operationName = 'CreateElection';

export function createElection(dcOrVars, vars) {
  return executeMutation(createElectionRef(dcOrVars, vars));
}

export const listAvailableElectionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableElections');
}
listAvailableElectionsRef.operationName = 'ListAvailableElections';

export function listAvailableElections(dc) {
  return executeQuery(listAvailableElectionsRef(dc));
}

export const castVoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CastVote', inputVars);
}
castVoteRef.operationName = 'CastVote';

export function castVote(dcOrVars, vars) {
  return executeMutation(castVoteRef(dcOrVars, vars));
}

export const getUserRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserRole', inputVars);
}
getUserRoleRef.operationName = 'GetUserRole';

export function getUserRole(dcOrVars, vars) {
  return executeQuery(getUserRoleRef(dcOrVars, vars));
}

