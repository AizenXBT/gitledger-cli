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

### Show config

```bash
npm run dev -- config:show
```

## Project layout

- `src/index.ts` CLI entrypoint
- `src/commands/` command handlers
- `src/lib/` shared output and utility helpers

## Contributing

See `CONTRIBUTING.md`.

## Security

See `SECURITY.md`.

## License

MIT
