import { info, success, fail } from '../lib/output.js';
import { getConfigPath, loadConfig, saveConfig, setConfigKey, type CliConfig } from '../config/store.js';

export async function runConfigShow(): Promise<void> {
  const current = await loadConfig();
  info(`Config file: ${getConfigPath()}`);
  console.log(JSON.stringify(current, null, 2));
}

export async function runConfigInit(): Promise<void> {
  const path = await saveConfig(await loadConfig());
  success(`Initialized config at ${path}`);
}

export async function runConfigGet(key: keyof CliConfig): Promise<void> {
  const current = await loadConfig();
  const value = current[key];
  if (value === undefined) {
    fail(`Config key not set: ${key}`);
  }
  console.log(String(value));
}

export async function runConfigSet(key: keyof CliConfig, value: string): Promise<void> {
  if (!['backendUrl', 'chain', 'walletAddress', 'notifierWebhookUrl'].includes(key)) {
    fail(`Unsupported config key: ${key}`);
  }

  if (key === 'chain' && value !== 'base-mainnet' && value !== 'base-sepolia') {
    fail('chain must be one of: base-mainnet, base-sepolia');
  }

  const file = await setConfigKey(key, value as CliConfig[typeof key]);
  success(`Updated ${key} in ${file}`);
}
