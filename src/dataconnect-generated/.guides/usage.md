# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.





## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createElection, listAvailableElections, castVote, getUserRole } from '@dataconnect/generated';


// Operation CreateElection:  For variables, look at type CreateElectionVars in ../index.d.ts
const { data } = await CreateElection(dataConnect, createElectionVars);

// Operation ListAvailableElections: 
const { data } = await ListAvailableElections(dataConnect);

// Operation CastVote:  For variables, look at type CastVoteVars in ../index.d.ts
const { data } = await CastVote(dataConnect, castVoteVars);

// Operation GetUserRole:  For variables, look at type GetUserRoleVars in ../index.d.ts
const { data } = await GetUserRole(dataConnect, getUserRoleVars);


```