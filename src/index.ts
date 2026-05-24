#!/usr/bin/env node
import { Command } from 'commander';
import { runHealth } from './commands/health.js';
import { runConfigShow } from './commands/config.js';

const program = new Command();

program
  .name('gitledger')
  .description('GitLedger command line interface')
  .version('0.1.0');

program
  .command('health')
  .description('Check GitLedger backend health')
  .option('--api-url <url>', 'Override backend API URL')
  .action(async (opts: { apiUrl?: string }) => {
    await runHealth(opts);
  });

program
  .command('config:show')
  .description('Show effective CLI config')
  .action(() => {
    runConfigShow();
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(`[error] ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
});
