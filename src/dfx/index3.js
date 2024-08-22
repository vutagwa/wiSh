import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as donationHubIDL, canisterId as donationHubCanisterId } from '../declarations/donation_hub';

const agent = new HttpAgent();
const donationHubActor = Actor.createActor(donationHubIDL, {
  agent,
  canisterId: donationHubCanisterId,
});

export default donationHubActor;
