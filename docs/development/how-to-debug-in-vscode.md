---
id: how-to-debug-in-vscode
sidebar_label: How to debug in VS Code
hide_title: true
---

# 🐞 Debugging Your Flux0 Agent in VS Code

When developing your agents in Flux0, debugging is essential for a smooth development experience. This guide walks you through setting up **Visual Studio Code** to debug your Flux0 agent locally with breakpoints, environment variables, and full context.

---

## ✅ Prerequisites

- VS Code installed
- Python extension for VS Code installed
- A virtual environment created and activated (`.venv`)
- Flux0 [installed](/docs/quickstart/installation#-option-1-install-via-pypi) and working (via pip)
- Your agent is defined and registered in your module
- `flux0-server` is available inside your virtual environment (`.venv/bin/flux0-server`)

---

## 🧭 Steps to Debug

### 1. Create `.vscode/launch.json`

In your project root, create the folder `.vscode` (if not already present) and add a file named `launch.json`.

Paste the following content:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug flux0-server",
      "type": "debugpy",
      "request": "launch",
      "program": "${workspaceFolder}/.venv/bin/flux0-server",
      "envFile": "${workspaceFolder}/.env",
      "env": {
        "PYTHONPATH": "."
      },
      "console": "integratedTerminal"
    }
  ]
}
```

---

### 2. Explanation of Configuration

- `"program"`: Points to the `flux0-server` binary inside your virtual environment. This ensures consistency with how you'd run it via CLI.
- `"envFile"`: Loads environment variables from a `.env` file — useful for setting `FLUX0_MODULES`, API keys, etc.
- `"env"`: Overrides or supplements environment variables. Here we ensure the Python path includes your project root.
- `"console"`: Using `"integratedTerminal"` helps show logs and makes interactive debugging easier.

---

### 3. Example `.env` File

Create a `.env` file at the root of your project (next to `pyproject.toml`) with at least the following:

```env
FLUX0_MODULES=modules.agents
OPENAI_API_KEY=sk-...
```

You can add any other variables your agent logic requires here.

---

### 4. Start Debugging 🚀

- Open the **Run and Debug** panel in VS Code (`Ctrl+Shift+D` or `Cmd+Shift+D`)
- Choose **"Debug flux0-server"** from the dropdown
- Click the green **Start Debugging** button ▶️

You can now set breakpoints in your agent code and inspect variables, stack traces, and runtime state as usual.

---

Now you’re ready to debug your Flux0 agents like a pro 🧠🛠
