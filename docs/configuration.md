---
sidebar_position: 30
id: configuration
title: Configuration
description: Learn how to configure Flux0 via environment variables.
---

# ⚙️ Configuration

Flux0 is configured entirely via **environment variables** for maximum flexibility and portability.  
This allows you to run it locally, in containers, or in cloud environments without changing the code.

---

## 📦 Modules to Load

Flux0 loads agent modules dynamically at runtime.

```bash
# Comma-separated list of Python packages/modules to load
FLUX0_MODULES=modules.agents
```

> Example: If your project has multiple agent modules, separate them with commas:
>
> ```bash
> FLUX0_MODULES=modules.agents,my_custom_agent
> ```

---

## 🗄 Database (Storage) Configuration

Flux0 uses a single **DB URI** variable to define the storage backend.  
This makes it easy to switch between in-memory, file-based, or production-grade databases.

| Mode           | URI Example                              | Notes                                                                     |
| -------------- | ---------------------------------------- | ------------------------------------------------------------------------- |
| **In-Memory**  | `FLUX0_DB_URI=nanodb://memory`           | No persistence, resets on restart. Best for testing.                      |
| **File-Based** | `FLUX0_DB_URI=nanodb://json?dir=./data`  | Stores JSON files locally. Works with a single server. Great for POC/MVP. |
| **MongoDB**    | `FLUX0_DB_URI=mongodb://localhost:27017` | Production-ready, supports clustering and replication.                    |

---

## 🌍 Environment Mode

Controls environment-specific settings such as logging format.

```bash
# Possible values: development | production
FLUX0_ENV=development
```

---

## 🔌 Server Port

The port Flux0 binds to. Defaults to `8080` if not set.

```bash
FLUX0_PORT=8080
```

---

## 📝 Logging Level

Sets the verbosity of logs.

```bash
# Possible values: debug | info | warning | error | critical
FLUX0_LOG_LEVEL=debug
```

---

## ✅ Example `.env` file

```env
FLUX0_MODULES=modules.agents,my_custom_agent
FLUX0_DB_URI=nanodb://json?dir=./data
FLUX0_ENV=development
FLUX0_PORT=9090
FLUX0_LOG_LEVEL=debug
```

You can load this `.env` file automatically when running Flux0 locally or in Docker.
