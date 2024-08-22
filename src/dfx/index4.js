import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as walletIDL, canisterId as walletCanisterId } from '../declarations/wallet';

const agent = new HttpAgent();
const walletActor = Actor.createActor(walletIDL, {
  agent,
  canisterId: walletCanisterId,
});

export default walletActor;
