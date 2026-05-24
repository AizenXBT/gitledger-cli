import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { homedir } from 'node:os';

export type CliConfig = {
  backendUrl: string;
  chain: 'base-mainnet' | 'base-sepolia';
  walletAddress?: string;
  notifierWebhookUrl?: string;
};

const DEFAULT_CONFIG: CliConfig = {
  backendUrl: 'https://backend-uuq8.onrender.com',
  chain: 'base-mainnet',
};

function configPath(): string {
  return join(homedir(), '.gitledger', 'config.json');
}

export async function loadConfig(): Promise<CliConfig> {
  const file = configPath();
  try {
    const raw = await readFile(file, 'utf8');
    const parsed = JSON.parse(raw) as Partial<CliConfig>;
    return {
      ...DEFAULT_CONFIG,
      ...parsed,
    };
  } catch {
    return { ...DEFAULT_CONFIG };
  }
}

export async function saveConfig(next: CliConfig): Promise<string> {
  const file = configPath();
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(next, null, 2)}\n`, 'utf8');
  return file;
}

export async function setConfigKey<K extends keyof CliConfig>(key: K, value: CliConfig[K]): Promise<string> {
  const current = await loadConfig();
  current[key] = value;
  return saveConfig(current);
}

export function getConfigPath(): string {
  return configPath();
}
