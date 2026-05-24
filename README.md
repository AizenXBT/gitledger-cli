# GitLedger CLI

GitLedger CLI is the command line interface for GitLedger workflows.

It provides a developer friendly wrapper for backend checks, local config inspection, and future staking and review automation commands.

## Status

This repository is scaffolded as an open source TypeScript CLI foundation.

## Requirements

- Node.js 18+

## Install

```bash
npm install
```

## Run in development

```bash
npm run dev -- --help
```

## Build

```bash
npm run build
```

## Usage

### Show help

```bash
gitledger --help
```

### Check backend health

```bash
npm run dev -- health
```

Override backend URL:

```bash
npm run dev -- health --api-url https://backend-uuq8.onrender.com
```

Machine-readable health output:

```bash
npm run dev -- health --json
```

### Config commands

Initialize local config file (`~/.gitledger/config.json`):

```bash
npm run dev -- config:init
```

Show effective config:

```bash
npm run dev -- config:show
```

Set backend URL in config:

```bash
npm run dev -- config:set backendUrl https://backend-uuq8.onrender.com
```

Read a config key:

```bash
npm run dev -- config:get backendUrl
```

## Project layout

- `src/index.ts` CLI entrypoint
- `src/commands/` command handlers
- `src/config/` local config store logic
- `src/lib/` shared output and utility helpers

## Contributing

See `CONTRIBUTING.md`.

## Security

See `SECURITY.md`.

## License

MIT
