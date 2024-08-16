import { Actor, HttpAgent } from '@dfinity/agent';
import { Principal } from '@dfinity/principal';

export const canisterId = Principal.fromText('yhlsk-rqaaa-aaaab-qacfq-cai');

export const idlFactory = ({ Actor, HttpAgent }) => Actor.createActor(
  {
    addReport: ['query', []],
    getReport: ['query', []],
    listReports: ['query', []],
  },
  { agent: new HttpAgent(), canisterId }
);
