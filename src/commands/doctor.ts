import { loadConfig } from '../config/store.js';
import { info, success, warn } from '../lib/output.js';

export async function runDoctor(): Promise<void> {
  const config = await loadConfig();

  info('Running GitLedger CLI diagnostics');
  info(`backendUrl=${config.backendUrl}`);
  info(`chain=${config.chain}`);

  const checks: Array<{ name: string; ok: boolean; details?: string }> = [];

  const backendUrlValid = /^https?:\/\//.test(config.backendUrl);
  checks.push({
    name: 'config.backendUrl format',
    ok: backendUrlValid,
    details: backendUrlValid ? 'ok' : 'must start with http:// or https://',
  });

  const chainValid = config.chain === 'base-mainnet' || config.chain === 'base-sepolia';
  checks.push({
    name: 'config.chain value',
    ok: chainValid,
    details: chainValid ? 'ok' : 'must be base-mainnet or base-sepolia',
  });

  try {
    const healthUrl = `${config.backendUrl.replace(/\/$/, '')}/health`;
    const res = await fetch(healthUrl, { method: 'GET' });
    checks.push({
      name: 'backend.health reachable',
      ok: res.ok,
      details: `status=${res.status}`,
    });
  } catch (error) {
    checks.push({
      name: 'backend.health reachable',
      ok: false,
      details: error instanceof Error ? error.message : String(error),
    });
  }

  let failed = 0;
  for (const c of checks) {
    if (c.ok) {
      success(`${c.name}: ${c.details ?? 'ok'}`);
    } else {
      failed += 1;
      warn(`${c.name}: ${c.details ?? 'failed'}`);
    }
  }

  if (failed > 0) {
    warn(`Doctor completed with ${failed} failing check(s)`);
    process.exitCode = 1;
    return;
  }

  success('Doctor completed successfully');
}
