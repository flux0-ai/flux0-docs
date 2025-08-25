---
sidebar_position: 5
id: docker
title: Docker
description: Learn how to deploy your Flux0 agent using Docker.
---

Run your Flux0 agent in a portable, self-contained Docker environment—ideal for both local testing and production.

> 💡 This follows the [Docker installation instructions](../quickstart/installation#-option-2-run-via-docker-containerized) guide.

## 📥 Step1: Install Dependencies

Before writing code, define the required libraries for your agent:

```Dockerfile {4-5}
# Inherit from the flux0 image
FROM flux0ai/flux0:beta AS base

# Install extra dependencies based on your agent's requirements
RUN pip install langchain "langchain[openai]"

# Copy your agent code into the container
COPY ./modules /app/modules
```

## 🧠 Step2: Define Your Agent Logic

Start by writing your agent logic. In Flux0, an agent is defined by implementing a **runner** — a class that encapsulates how to handle the agent's execution and **stream events** to the client. Runners don't manage sessions directly but are triggered per session execution.

You can annotate your runner using `@agent_runner`, which registers it with Flux0 by name. Here’s an example using LangChain to translate input text:

:::tip
You can download the files via curl (or copy & paste the code below)

```bash
mkdir -p modules/my_agent
curl https://raw.githubusercontent.com/flux0-ai/flux0/develop/examples/langchain_simple/agent.py -o modules/my_agent/agent.py
curl https://raw.githubusercontent.com/flux0-ai/flux0/develop/examples/langchain_simple/__init__.py -o modules/my_agent/__init__.py
```

:::

```js reference title="<your_flux0>/my_agent/agent.py"
https://github.com/flux0-ai/flux0/blob/develop/examples/langchain_simple/agent.py
```

## 📦 Register the Module

Your runner must be registered in a Python module so Flux0 can load it.

In your `my_agent` directory, create an `__init__.py` file like this:

```js reference title="<your_flux0>/my_agent/__init__.py"
https://github.com/flux0-ai/flux0/blob/develop/examples/langchain_simple/__init__.py
```

## 🚀 Step 4: Run the Server

Start the Flux0 server:

```bash
docker build -t my-flux0 . && docker run --rm -e FLUX0_MODULES=my_agent -e OPENAI_API_KEY=<key> -p 8080:8080 my-flux0
```

Your agent will now be available through the API and ready to receive interactions.

## 🧾 Step 5: Register the Agent

Once your runner is defined and your module is registered, you can create the agent entry in the database:

```bash
docker run --rm --network host my-flux0 \
  flux0 agents create --name "Translation Agent" --type langchain_simple
```

This defines metadata about the agent and links it to the runner by name. The `--type` refers to the name you gave in `@agent_runner("...")`.

## 💬 Step 6: Talk to Your Agent

Start chatting with your agent at [http://localhost:8080/chat](http://localhost:8080/chat)

## 🔍 What’s Next?

- Ready to go beyond Hello World? Jump into the [Examples](/docs/category/agents-examples) to explore powerful agent use cases!
- Want to build your own UI to interact with your agent? see [Flux0-React](https://github.com/flux0-ai/flux0-react).
