---
slug: releasing-monorepo-using-uv-workspace-and-python-semantic-release
title: Releasing a Monorepo using uv workspace and Python Semantic Release
authors: asaf
tags: [python, semantic-release, uv, monorepo]
---

# Automating Releases in a uv Workspace with python-semantic-release

Managing multiple Python packages separately is a headache—different lifecycles, dependency mismatches, and endless coordination. A **uv workspace**, inspired by Rust’s **Cargo workspaces**, simplifies this by managing all packages under one monorepo, ensuring consistent versioning and reducing overhead.

But even in a monorepo, releases can be tricky. Each package within the workspace needs to be released separately, meaning it requires its own **changelog, git tag, build artifacts, and GitHub release**. The root project itself may also follow its own versioning and release cycle. Keeping everything in sync manually is painful.

Enter **python-semantic-release** (PSR)—it automates versioning, changelogs, and publishing based on commit messages. In this post, we’ll show you how to integrate **PSR** into your **uv workspace** for effortless, structured releases.

<!-- truncate -->

## Setting Up the uv Workspace

First, let's create a **uv workspace** with a root project and two packages (`core` and `svc1`). This structure allows us to manage multiple services within a single repository while keeping each package independent. However, packages within the workspace may depend on each other, making it essential to manage versions correctly to avoid compatibility issues.

### Initializing the Workspace

```sh
mkdir uvws && cd uvws
uv init --package  # Initialize the root project

# Test the root project
uv run uvws uvws  # Expected output: Hello from uvws!

# Initialize the core package
uv init packages/core --package
uv run --package core core  # Expected output: Hello from core!
```

### Adding Functionality to `core`

```sh
echo -e '\ndef hi() -> str:\n    return "hi from core"' >> ./packages/core/src/core/__init__.py

# Run the method
uv run --package core python -c "import core; print(core.hi())"
```

### Creating and Linking `svc1`

```sh
uv init packages/svc1 --package
uv run --package svc1 svc1  # Expected output: Hello from svc1!

# Make core a dependency of svc1
uv add --package svc1 ./packages/core

# Verify dependencies
cat ./packages/svc1/pyproject.toml
```

`core` is now listed in `dependencies`, and `uv` ensures that workspace packages are properly linked:

```toml
dependencies = [
    "core",
]

[tool.uv.sources]
core = { workspace = true }
```

### Using `core` in `svc1`

```sh
echo -e 'from core import hi\n\ndef main() -> None:\n    print(hi())' > packages/svc1/src/svc1/__init__.py

# Test the updated svc1
uv run --package svc1 svc1  # Expected output: hi from core
```

Any changes in `core` are now automatically reflected in `svc1`, ensuring smooth dependency updates within the workspace.

### Building the Workspace

```sh
uv build  # Builds uvws
uv build --all-packages  # Builds uvws, core, and svc1
rm -rf ./dist
```

With our workspace set up, let's move on to automating releases with **python-semantic-release**.

## Adding python-semantic-release to Automate Releases

Now that our **uv workspace** is set up, we need to automate releases for `core`, `svc1`, and the root project `uvws`. Each package requires independent versioning, changelogs, and GitHub releases, which can be managed efficiently using **python-semantic-release**.

We'll configure `python-semantic-release` to:

- Detect changes in each package based on file paths and commit messages.
- Automatically bump versions using **Conventional Commits**.
- Tag and update relevant files with the new version.
- Generate changelogs and GitHub releases.

### Installing Dependencies

```sh
uv add python-semantic-release --dev
```

### Downloading the Monorepo Parser

_Note: This is a temporary solution until the monorepo parser is officially released as part of PSR._

```sh
mkdir -p ./scripts/psr/custom_parser
curl https://raw.githubusercontent.com/codejedi365/psr-monorepo-poweralpha/refs/heads/main/scripts/custom_parser/monorepo_parser.py -o ./scripts/psr/custom_parser/monorepo_parser.py
```

### Configuring PSR for `core`

Since we are in a monorepo, we need to ensure PSR only considers commits relevant to `core`.

The **monorepo parser** determines relevant changes based on file paths and optionally commit messages.

#### Conventional Commit Structure

Conventional Commits follow:

```
<type>[optional scope]: <description>
```

For monorepos, it’s recommended to scope commits to specific packages:

```
<type>[<pkg>-optional scope]: <description>
```

This improves readability and helps filter changes per package.

#### Example Commit Messages

- `feat(core): add new feature` → Only affects `core`
- `fix(core-readme): update documentation` → Still relevant to `core`

_Note:_ The monorepo parser primarily filters by paths (e.g., `<root>/packages/core`). It can also use commit scopes with `scope_prefix`.

```sh
cat <<'EOF' >> ./packages/svc1/pyproject.toml

[tool.semantic_release]
build_command = "pip install uv && uv build"
commit_parser = "../../scripts/psr/custom_parser/monorepo_parser.py:ConventionalCommitMonorepoParser"
commit_message = """
chore(core-release): Release `core@{version}` [skip ci]
Automatically generated by python-semantic-release
"""
allow_zero_version = true
tag_format = "core-{version}"
version_toml = ["pyproject.toml:project.version"]
version_variables = ["src/core/__init__.py:__version__"]

[semantic_release.branches.main]
match = "main"
prerelease = false

[semantic_release.branches.beta]
match = "beta"
prerelease = true
prerelease_token = "beta"

[tool.semantic_release.publish]
dist_glob_patterns = ["../../dist/core-*"]

EOF
```

### Creating a Release Script

```sh
cat <<'EOF' > ./scripts/release-package.sh
#!/bin/bash
set -e
PROJECT_ROOT="$(dirname "$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")")"
VIRTUAL_ENV="$PROJECT_ROOT/.venv"
cd "$PROJECT_ROOT" || exit
SERVICE_NAME=$1
if [ ! -d "packages/$SERVICE_NAME" ]; then
  echo "Error: Directory packages/$SERVICE_NAME does not exist."
  exit 1
fi
pushd "packages/$SERVICE_NAME" >/dev/null || exit
printf '%s\n' "Releasing $SERVICE_NAME..."
"$VIRTUAL_ENV/bin/semantic-release" -vv version --no-push
popd >/dev/null || exit
EOF
chmod +x ./scripts/release-package.sh
```

### Initializing Git and Pushing to Remote

PSR relies on `git remote get-url origin`, so we need to set up a repository before running versioning commands:

```sh
git init
git add .
git commit -m 'Initial commit'
git remote add origin https://github.com/asaf/uvws
```

With this setup, `python-semantic-release` is now configured to manage versioning and releases within the monorepo efficiently!

### Releasing \`core\`

To release core package, simply run: \`./scripts/release-package.sh core\`

The initial release would be 0.0.0 since initial commit is ignored and we don't have other commits for the core package, a `CHANGELOG.md` is created for the release with no commits.

#

### Configure PSR for \`svc1\`

```
cat <<'EOF' >> ./packages/core/pyproject.toml
[tool.semantic_release]
build_command = "pip install uv && uv build"
commit_parser = "../../scripts/psr/custom_parser/monorepo_parser.py:ConventionalCommitMonorepoParser"
commit_message = """\
chore(svc1-release): Release `svc1@{version}` [skip ci]
Automatically generated by python-semantic-release
"""

allow_zero_version = true
tag_format = "svc1-{version}"
version_toml = ["pyproject.toml:project.version"]
version_variables = ["src/svc1/__init__.py:__version__"]

[semantic_release.branches.main]
match = "main"
prerelease = false

[semantic_release.branches.beta]
match = "beta"
prerelease = true
prerelease_token = "beta"

[tool.semantic_release.publish]
dist_glob_patterns = ["../../dist/svc1-*"]
EOF

```
