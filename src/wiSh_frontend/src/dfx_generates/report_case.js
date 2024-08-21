import { Actor, HttpAgent } from'@dfinity/agent';
import { Principal } from'@dfinity/principal';

export const canisterId = Principal.fromText('3l4c5-2qaaa-aaaab-qacpq-cai');

export const idlFactory = ({ Actor, HttpAgent }) => Actor.createActor(
  {
    addReport: ['query', []],
    getReport: ['query', []],
    listReports: ['query', []],
    addWishCoins: ['update', []],
    sendWishCoins: ['update', []],
    receiveWishCoins: ['update', []],
    getWishCoinsBalance: ['query', []],
    getTransactionHistory: ['query', []],
  },
  { agent: newHttpAgent(), canisterId }
);
