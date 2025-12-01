const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'voting-app',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createElectionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateElection', inputVars);
}
createElectionRef.operationName = 'CreateElection';
exports.createElectionRef = createElectionRef;

exports.createElection = function createElection(dcOrVars, vars) {
  return executeMutation(createElectionRef(dcOrVars, vars));
};

const listAvailableElectionsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableElections');
}
listAvailableElectionsRef.operationName = 'ListAvailableElections';
exports.listAvailableElectionsRef = listAvailableElectionsRef;

exports.listAvailableElections = function listAvailableElections(dc) {
  return executeQuery(listAvailableElectionsRef(dc));
};

const castVoteRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CastVote', inputVars);
}
castVoteRef.operationName = 'CastVote';
exports.castVoteRef = castVoteRef;

exports.castVote = function castVote(dcOrVars, vars) {
  return executeMutation(castVoteRef(dcOrVars, vars));
};

const getUserRoleRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetUserRole', inputVars);
}
getUserRoleRef.operationName = 'GetUserRole';
exports.getUserRoleRef = getUserRoleRef;

exports.getUserRole = function getUserRole(dcOrVars, vars) {
  return executeQuery(getUserRoleRef(dcOrVars, vars));
};
