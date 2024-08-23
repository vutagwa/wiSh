import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as communityHubIDL, canisterId as communityHubCanisterId } from '../declarations/community_hub';

const agent = new HttpAgent();
const communityHubActor = Actor.createActor(communityHubIDL, {
  agent,
  canisterId: 'br5f7-7uaaa-aaaaa-qaaca-cai',
});

export default communityHubActor;