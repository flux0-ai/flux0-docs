---
sidebar_position: 2
id: installation
title: Installation
description: Learn how to install Flux0 via PyPI or Docker.
---

# 🚀 Setup

Flux0 can be installed in two primary ways: via **PyPI** using a package manager such `pip` or via **Docker**. Choose the method that best fits your environment and workflow.

---

## 📦 Option 1: Install via PyPI

If you want to run Flux0 locally on your machine:

### 1. Prerequisites

- Python 3.13+

### 2. Install Flux0

Create a new project or navigate to your existing Python workspace:

```bash
mkdir ~/tmp/myflux0 && cd ~/tmp/myflux0
python3 -m venv .venv
source .venv/bin/activate

# install the SDK via github and the flux0 framework
pip install git+https://github.com/flux0-ai/flux0-client-python
pip install flux0_ai
```

### 3. Start the Server

```
flux0-server
```

By default, the server will be available at [http://localhost:8080](http://localhost:8080).

## 🐳 Option 2: Run via Docker

TODO

## ✅ Next Steps

- Visit [http://localhost:8080](http://localhost:8080) for a chat.
- Create your [first agent](./first-agent).
