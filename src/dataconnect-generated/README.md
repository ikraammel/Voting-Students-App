# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAvailableElections*](#listavailableelections)
  - [*GetUserRole*](#getuserrole)
- [**Mutations**](#mutations)
  - [*CreateElection*](#createelection)
  - [*CastVote*](#castvote)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAvailableElections
You can execute the `ListAvailableElections` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listAvailableElections(): QueryPromise<ListAvailableElectionsData, undefined>;

interface ListAvailableElectionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableElectionsData, undefined>;
}
export const listAvailableElectionsRef: ListAvailableElectionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableElections(dc: DataConnect): QueryPromise<ListAvailableElectionsData, undefined>;

interface ListAvailableElectionsRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableElectionsData, undefined>;
}
export const listAvailableElectionsRef: ListAvailableElectionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableElectionsRef:
```typescript
const name = listAvailableElectionsRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableElections` query has no variables.
### Return Type
Recall that executing the `ListAvailableElections` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableElectionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAvailableElectionsData {
  elections: ({
    id: UUIDString;
    title: string;
    description: string;
    startDate: TimestampString;
    endDate: TimestampString;
  } & Election_Key)[];
}
```
### Using `ListAvailableElections`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableElections } from '@dataconnect/generated';


// Call the `listAvailableElections()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableElections();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableElections(dataConnect);

console.log(data.elections);

// Or, you can use the `Promise` API.
listAvailableElections().then((response) => {
  const data = response.data;
  console.log(data.elections);
});
```

### Using `ListAvailableElections`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableElectionsRef } from '@dataconnect/generated';


// Call the `listAvailableElectionsRef()` function to get a reference to the query.
const ref = listAvailableElectionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableElectionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.elections);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.elections);
});
```

## GetUserRole
You can execute the `GetUserRole` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserRole(vars: GetUserRoleVariables): QueryPromise<GetUserRoleData, GetUserRoleVariables>;

interface GetUserRoleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserRoleVariables): QueryRef<GetUserRoleData, GetUserRoleVariables>;
}
export const getUserRoleRef: GetUserRoleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserRole(dc: DataConnect, vars: GetUserRoleVariables): QueryPromise<GetUserRoleData, GetUserRoleVariables>;

interface GetUserRoleRef {
  ...
  (dc: DataConnect, vars: GetUserRoleVariables): QueryRef<GetUserRoleData, GetUserRoleVariables>;
}
export const getUserRoleRef: GetUserRoleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserRoleRef:
```typescript
const name = getUserRoleRef.operationName;
console.log(name);
```

### Variables
The `GetUserRole` query requires an argument of type `GetUserRoleVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserRoleVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetUserRole` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserRoleData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserRoleData {
  user?: {
    role: string;
  };
}
```
### Using `GetUserRole`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserRole, GetUserRoleVariables } from '@dataconnect/generated';

// The `GetUserRole` query requires an argument of type `GetUserRoleVariables`:
const getUserRoleVars: GetUserRoleVariables = {
  id: ..., 
};

// Call the `getUserRole()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserRole(getUserRoleVars);
// Variables can be defined inline as well.
const { data } = await getUserRole({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserRole(dataConnect, getUserRoleVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserRole(getUserRoleVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserRole`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserRoleRef, GetUserRoleVariables } from '@dataconnect/generated';

// The `GetUserRole` query requires an argument of type `GetUserRoleVariables`:
const getUserRoleVars: GetUserRoleVariables = {
  id: ..., 
};

// Call the `getUserRoleRef()` function to get a reference to the query.
const ref = getUserRoleRef(getUserRoleVars);
// Variables can be defined inline as well.
const ref = getUserRoleRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserRoleRef(dataConnect, getUserRoleVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateElection
You can execute the `CreateElection` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createElection(vars: CreateElectionVariables): MutationPromise<CreateElectionData, CreateElectionVariables>;

interface CreateElectionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateElectionVariables): MutationRef<CreateElectionData, CreateElectionVariables>;
}
export const createElectionRef: CreateElectionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createElection(dc: DataConnect, vars: CreateElectionVariables): MutationPromise<CreateElectionData, CreateElectionVariables>;

interface CreateElectionRef {
  ...
  (dc: DataConnect, vars: CreateElectionVariables): MutationRef<CreateElectionData, CreateElectionVariables>;
}
export const createElectionRef: CreateElectionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createElectionRef:
```typescript
const name = createElectionRef.operationName;
console.log(name);
```

### Variables
The `CreateElection` mutation requires an argument of type `CreateElectionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateElectionVariables {
  title: string;
  description: string;
  startDate: TimestampString;
  endDate: TimestampString;
  status: string;
}
```
### Return Type
Recall that executing the `CreateElection` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateElectionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateElectionData {
  election_insert: Election_Key;
}
```
### Using `CreateElection`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createElection, CreateElectionVariables } from '@dataconnect/generated';

// The `CreateElection` mutation requires an argument of type `CreateElectionVariables`:
const createElectionVars: CreateElectionVariables = {
  title: ..., 
  description: ..., 
  startDate: ..., 
  endDate: ..., 
  status: ..., 
};

// Call the `createElection()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createElection(createElectionVars);
// Variables can be defined inline as well.
const { data } = await createElection({ title: ..., description: ..., startDate: ..., endDate: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createElection(dataConnect, createElectionVars);

console.log(data.election_insert);

// Or, you can use the `Promise` API.
createElection(createElectionVars).then((response) => {
  const data = response.data;
  console.log(data.election_insert);
});
```

### Using `CreateElection`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createElectionRef, CreateElectionVariables } from '@dataconnect/generated';

// The `CreateElection` mutation requires an argument of type `CreateElectionVariables`:
const createElectionVars: CreateElectionVariables = {
  title: ..., 
  description: ..., 
  startDate: ..., 
  endDate: ..., 
  status: ..., 
};

// Call the `createElectionRef()` function to get a reference to the mutation.
const ref = createElectionRef(createElectionVars);
// Variables can be defined inline as well.
const ref = createElectionRef({ title: ..., description: ..., startDate: ..., endDate: ..., status: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createElectionRef(dataConnect, createElectionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.election_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.election_insert);
});
```

## CastVote
You can execute the `CastVote` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
castVote(vars: CastVoteVariables): MutationPromise<CastVoteData, CastVoteVariables>;

interface CastVoteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CastVoteVariables): MutationRef<CastVoteData, CastVoteVariables>;
}
export const castVoteRef: CastVoteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
castVote(dc: DataConnect, vars: CastVoteVariables): MutationPromise<CastVoteData, CastVoteVariables>;

interface CastVoteRef {
  ...
  (dc: DataConnect, vars: CastVoteVariables): MutationRef<CastVoteData, CastVoteVariables>;
}
export const castVoteRef: CastVoteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the castVoteRef:
```typescript
const name = castVoteRef.operationName;
console.log(name);
```

### Variables
The `CastVote` mutation requires an argument of type `CastVoteVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CastVoteVariables {
  electionId: UUIDString;
  positionId: UUIDString;
  candidateId: UUIDString;
}
```
### Return Type
Recall that executing the `CastVote` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CastVoteData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CastVoteData {
  vote_insert: Vote_Key;
}
```
### Using `CastVote`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, castVote, CastVoteVariables } from '@dataconnect/generated';

// The `CastVote` mutation requires an argument of type `CastVoteVariables`:
const castVoteVars: CastVoteVariables = {
  electionId: ..., 
  positionId: ..., 
  candidateId: ..., 
};

// Call the `castVote()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await castVote(castVoteVars);
// Variables can be defined inline as well.
const { data } = await castVote({ electionId: ..., positionId: ..., candidateId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await castVote(dataConnect, castVoteVars);

console.log(data.vote_insert);

// Or, you can use the `Promise` API.
castVote(castVoteVars).then((response) => {
  const data = response.data;
  console.log(data.vote_insert);
});
```

### Using `CastVote`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, castVoteRef, CastVoteVariables } from '@dataconnect/generated';

// The `CastVote` mutation requires an argument of type `CastVoteVariables`:
const castVoteVars: CastVoteVariables = {
  electionId: ..., 
  positionId: ..., 
  candidateId: ..., 
};

// Call the `castVoteRef()` function to get a reference to the mutation.
const ref = castVoteRef(castVoteVars);
// Variables can be defined inline as well.
const ref = castVoteRef({ electionId: ..., positionId: ..., candidateId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = castVoteRef(dataConnect, castVoteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.vote_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.vote_insert);
});
```

