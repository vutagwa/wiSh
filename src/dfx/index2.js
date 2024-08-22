import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as communityHubIDL, canisterId as communityHubCanisterId } from '../declarations/community_hub/community_hub.did';

const agent = new HttpAgent();
const communityHubActor = Actor.createActor(communityHubIDL, {
  agent,
  canisterId: communityHubCanisterId,
});

export default communityHubActor;
