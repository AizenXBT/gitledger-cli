# Contributing

Thanks for contributing to GitLedger CLI.

## Development flow

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Run checks locally
5. Open a pull request

## Local checks

```bash
npm run check
npm run build
```

## Pull request guidance

- Keep changes focused and small
- Include clear commit messages
- Update docs when behavior changes
- Add tests for non-trivial logic

## Code style

- TypeScript strict mode
- Prefer small composable command handlers
- Keep command output explicit and parseable
