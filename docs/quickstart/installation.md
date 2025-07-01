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

The server can be accessed at [http://localhost:8080](http://localhost:8080).

API docs available at [http://localhost:8080/docs](http://localhost:8080/docs).

## 🐳 Option 2: Run via Docker

Flux0 can run in a containerized environment:

```
# this assumes your agent code is within the my_agent module.
docker run -e FLUX0_MODULES=my_agent -p 8080:8080 -v $PWD/my_agent:/app/my_agent flux0ai/flux0-ai:beta
```

To use the flux0 CLI, such as creating an agent, run:

```
docker run --rm --network host flux0ai/flux0-ai:beta flux0 agents create --name "My Agent" --type my_agent
```

The server can be accessed at [http://localhost:8080](http://localhost:8080).

API docs available at [http://localhost:8080/docs](http://localhost:8080/docs).

## ✅ Next Steps

- Visit [http://localhost:8080](http://localhost:8080) for a chat.
- Create your [first agent](./first-agent).
