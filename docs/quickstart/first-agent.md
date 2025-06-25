---
sidebar_position: 3
---

# First Agent

Flux0 does not dicatates how you build your agents, there is support for LangGraph out of the box but virtually any python framework could be used.

```bash
pip install langgraph "langchain[openai]"
```

## LangGraph

LangGraph is a framework for building stateful, multi-agent applications using graphs to manage the flow of language models and tools.

Lets build a weather agent in LangGraph, deployed and run inside flux0.

Install langgraph's packages inside your flux0 dir:

```bash
pip install langgraph langchain_openai
```

```bash
cat <<EOF >weather/graph.py
...
EOF

cat <<EOF >weather/__init__.py
from lagom import Container
from weather.graph import WeatherAgentRunner

async def init_module(container: Container):
container[WeatherAgentRunner] = WeatherAgentRunner

async def shutdown_module(): ...
EOF
```

```
flux0 agents create --name weather --type langgraph_weather
```

## PyndanticAI

TODO

## Run the client


```
PYTHONPATH=. FLUX0_MODULES=weather flux0-server
```