import { info, success, warn } from '../lib/output.js';

export type HealthOptions = {
  apiUrl?: string;
};

export async function runHealth(options: HealthOptions): Promise<void> {
  const base = options.apiUrl ?? 'https://backend-uuq8.onrender.com';
  const url = `${base.replace(/\/$/, '')}/health`;

  info(`Checking backend health: ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    warn(`Health endpoint returned status ${res.status}`);
    process.exitCode = 1;
    return;
  }

  const payload = (await res.json()) as {
    ok?: boolean;
    services?: Record<string, { status?: string }>;
  };

  if (!payload.ok) {
    warn('Backend reports unhealthy state');
    process.exitCode = 1;
    return;
  }

  const services = payload.services ?? {};
  const summary = Object.entries(services)
    .map(([name, data]) => `${name}:${data.status ?? 'unknown'}`)
    .join(', ');

  success(`Backend healthy (${summary})`);
}
