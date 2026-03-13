# Release Checklist

This repository publishes from a single GitHub Actions entrypoint: pushing a `v*`
tag triggers `.github/workflows/publish.yml`, which publishes workspace packages
to npm and then creates the GitHub Release notes.

## Local Steps

1. Run `pnpm build` and `pnpm lint:test_eslint`.
2. Run `pnpm tag` to bump package versions and refresh `CHANGELOG.md`.
3. Review the version changes and changelog output, then commit them.
4. Create a tag that matches the workspace version, for example `git tag v1.0.18`.
5. Push the commit and the tag.

## Remote Checks

1. Confirm exactly one workflow runs for the tag push: `Publish`.
2. Confirm the workflow completes `pnpm publish -r --no-git-checks`.
3. Confirm the same workflow creates the GitHub Release notes after publish.
