import { info } from '../lib/output.js';

export function runConfigShow(): void {
  const current = {
    backendUrl: process.env.GITLEDGER_API_URL ?? 'https://backend-uuq8.onrender.com',
    chain: 'base-mainnet',
  };

  info('Current GitLedger CLI config');
  console.log(JSON.stringify(current, null, 2));
}
