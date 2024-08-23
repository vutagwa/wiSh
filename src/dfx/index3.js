import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as donationHubIDL, canisterId as donationHubCanisterId } from '../declarations/Donation_hub';

const agent = new HttpAgent();
const donationHubActor = Actor.createActor(donationHubIDL, {
  agent,
  canisterId: 'be2us-64aaa-aaaaa-qaabq-cai',
});

export default donationHubActor;
