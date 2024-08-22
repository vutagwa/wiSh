import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as caseReportingIDL, canisterId as caseReportingCanisterId } from '../declarations/case_reporting';

const agent = new HttpAgent();
const caseReportingActor = Actor.createActor(caseReportingIDL, {
  agent,
  canisterId: caseReportingCanisterId,
});

export default caseReportingActor;