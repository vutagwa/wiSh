import { Actor, HttpAgent } from'@dfinity/agent';
import { Principal } from'@dfinity/principal';

export const canisterId = Principal.fromText('22w4c-cyaaa-aaaab-qacka-cai');

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
