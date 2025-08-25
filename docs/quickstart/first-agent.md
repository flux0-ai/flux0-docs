---
sidebar_position: 3
id: first-agent
title: First Agent
description: Learn how to build your first agent using Flux0.
---

Welcome to your first step with Flux0 agents!
This guide will walk you through creating and running a minimal agent in your local environment using **LangChain** and **OpenAI**.

Flux0 doesn’t lock you into any specific AI framework — while it natively supports **LangChain**, **LangGraph**, and **PydanticAI**, you’re free to use **any Pythonic LLM framework** of your choice.

> 💡 This follows the [PyPI installation instructions](installation#-option-1-install-via-pypi) guide. For container deployment see [Docker deployment](/docs/deployment/docker).

## 📥 Step1: Install Dependencies

Before writing code, install the required libraries:

```bash
cd <my_flux0>
pip install langchain "langchain[openai]"
```

## 🧠 Step2: Define Your Agent Logic

Start by writing your agent logic. In Flux0, an agent is defined by implementing a **runner** — a class that encapsulates how to handle the agent's execution and **stream events** to the client. Runners don't manage sessions directly but are triggered per session execution.

You can annotate your runner using `@agent_runner`, which registers it with Flux0 by name. Here’s an example using LangChain to translate input text:

:::tip
You can download the files via curl (or copy & paste the code below)

```bash
mkdir my_agent
curl https://raw.githubusercontent.com/flux0-ai/flux0/develop/examples/langchain_simple/agent.py -o my_agent/agent.py
curl https://raw.githubusercontent.com/flux0-ai/flux0/develop/examples/langchain_simple/__init__.py -o my_agent/__init__.py
```

:::

```js reference title="<your_flux0>/my_agent/agent.py"
https://github.com/flux0-ai/flux0/blob/develop/examples/langchain_simple/agent.py
```

## 📦 Step 3: Register the Module

Your runner must be registered in a Python module so Flux0 can load it.

In your `my_agent` directory, create an `__init__.py` file like this:

```js reference title="<your_flux0>/my_agent/__init__.py"
https://github.com/flux0-ai/flux0/blob/develop/examples/langchain_simple/__init__.py
```

## 🚀 Step 4: Run the Server

Start the Flux0 server locally:

```bash
PYTHONPATH=. FLUX0_MODULES=my_agent OPENAI_API_KEY=<your_key> flux0-server
```

Your agent will now be available through the API and ready to receive interactions.

## 🧾 Step 5: Register the Agent

Once your runner is defined and your module is registered, you can create the agent entry in the database:

```bash
flux0 agents create --name "Translation Agent" --type langchain_simple
```

This defines metadata about the agent and links it to the runner by name. The `--type` refers to the name you gave in `@agent_runner("...")`.

## 💬 Step 6: Talk to Your Agent

Start chatting with your agent at [http://localhost:8080/chat](http://localhost:8080/chat)

## 🔍 What’s Next?

- Ready to go beyond Hello World? Jump into the [Examples](/docs/category/agents-examples) to explore powerful agent use cases!
- Want to build your own UI to interact with your agent? see [Flux0-React](https://github.com/flux0-ai/flux0-react).
