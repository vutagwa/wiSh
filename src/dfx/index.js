import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory as caseReportingIDL, canisterId as caseReportingCanisterId } from '../declarations/case_reporting';

const agent = new HttpAgent();
const caseReportingActor = Actor.createActor(caseReportingIDL, {
  agent,
  canisterId: 'be2us-64aaa-aaaaa-qaabq-cai',
});

export default caseReportingActor;