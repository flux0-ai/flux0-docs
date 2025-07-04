---
sidebar_position: 2
id: installation
title: Installation
description: Learn how to install Flux0 via PyPI or Docker.
---

# Installation

Flux0 is ready to run in just a few steps. Whether you prefer installing via **PyPI** or running in **Docker**, we’ve got you covered.

Choose your preferred setup method:

## 📦 Option 1: Install via PyPI

Perfect if you want to develop and run Flux0 directly on your machine.

### 1. Prerequisites

- Python 3.13+

### 2. Installation Steps

```bash
mkdir ~/tmp/myflux0 && cd ~/tmp/myflux0
python3 -m venv .venv
source .venv/bin/activate

# install the SDK via github and the flux0 framework
pip install git+https://github.com/flux0-ai/flux0-client-python
pip install flux0_ai
```

### 🚀 Launch the Server

```bash
flux0-server
```

:::tip
To change the port, set the `FLUX0_PORT` environment variable.
:::

* 🌐 Open in browser: [http://localhost:8080](http://localhost:8080)
* 📚 Explore the API: [http://localhost:8080/docs](http://localhost:8080/docs)

Ready to build [your first agent](./first-agent)?

## 🐳 Option 2: Run via Docker (Containerized)

Ideal for isolated or containerized environments.

### 🧱 1. Create a `Dockerfile`

```Dockerfile
FROM flux0ai/flux0:beta AS base

# Install the additional Python packages
RUN pip install langchain "langchain[openai]"

# Copy your agent code into the container
COPY ./modules /app/modules
```

For now lets create an empty directory for your future agent code
```bash
mkdir modules
```

### 🛠️ 2. Build the Docker Image

```bash
docker build -t my-flux0-agent .
```

### 🚀 3. Run the Server

```bash
docker run \
  -p 8080:8080 \
  my-flux0-agent
```

* 🌐 Server: [http://localhost:8080](http://localhost:8080)
* 📚 API Docs: [http://localhost:8080/docs](http://localhost:8080/docs)

Ready to build [your first agent in docker](../deployment/docker)?

## ✅ What’s Next?

You're up and running — now it's time to put Flux0 to work!

* 🧠 [Create your first agent](./first-agent): Learn how to define your first AI agent and bring it to life.
* 🧪 [Examples](../category/examples): Browse ready-made agent examples built with different frameworks.
