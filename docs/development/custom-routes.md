---
id: custom-routes
sidebar_label: How to add custom routes
hide_title: true
---

# Custom Routes in Modules

Flux0 lets you extend the API by adding your own HTTP endpoints from **modules**. This page shows two paths:

1. **Simple route** — add a basic endpoint.
2. **Route with custom storage** — initialize a store and use it in a handler.

All module routers are mounted under **`/api/modules/...`** during app startup.

---

## Prerequisites

* Your module file **must** export lifecycle hooks: `init_module(container)` and `shutdown_module()`.
* Your module must export `get_routers(container) -> list[APIRouter]`.
* You can use common platform dependencies (e.g., `AuthedUser`) and services provided through the dependency injection.

---

## Add a Simple Route

Implement `get_routers(container)` and return a FastAPI `APIRouter` with your local prefix and handlers.

```python
from fastapi import APIRouter
from flux0_api.auth import AuthedUser

async def get_routers(container) -> list[APIRouter]:
  router = APIRouter(prefix="/hello")

  @router.get("/")
  async def hello_world(user: AuthedUser):
    return {"message": f"Hello {user.name} (id={user.id})!"}

  return [router]
```

**Effective path**: `GET /api/modules/hello/`

> The local prefix you set on the router (here `/hello`) is appended after `/api/modules`.

---

## Add a Route with Custom Storage

A **store** is a component that lets you persist and retrieve your own documents—such as user data, records, or other objects—using a backing database (e.g., NanoDB, MongoDB, etc.).

This example shows how to initialize a store (could be backed by a database such as NanoDB, MongoDB, etc.) and use it from a route.

### A. Define the Store

```python
from datetime import datetime, timezone
from typing import TypedDict

from flux0_core.ids import gen_id

class _StaticDocumentExample(TypedDict, total=False):
  id: str
  version: str
  created_at: datetime

class ExampleStaticDocumentStore:
  VERSION = "0.0.0"

  def __init__(self, db):
    self.db = db
    self._col = None

  async def setup(self):
    # Create or open a collection/table in your database
    self._col = await self.db.create_collection("example_static", _StaticDocumentExample)

  async def create(self) -> _StaticDocumentExample:
    created_at = datetime.now(timezone.utc)
    doc = _StaticDocumentExample(
      id=gen_id(),
      version=self.VERSION,
      created_at=created_at,
    )
    await self._col.insert_one(document=doc)
    return doc
```

### B. Initialize the Store in the Module

Use `init_module` to construct the store with the provided database, run `setup()`, and bind the instance back into the container.

```python
from fastapi import APIRouter
from flux0_api.auth import AuthedUser

from examples.static.static_store import ExampleStaticDocumentStore
from .static_agent import StaticAgentRunner

async def init_module(container) -> None:
  container[StaticAgentRunner] = StaticAgentRunner

  example_store = ExampleStaticDocumentStore(container["db"])
  await example_store.setup()
  container[ExampleStaticDocumentStore] = example_store

async def shutdown_module() -> None:
  print("Shutdown!")
```

### C. Define Routes That Use the Store

Retrieve the bound store instance from the container inside your route handler.

```python
async def get_routers(container) -> list[APIRouter]:
  router = APIRouter(prefix="/static")

  @router.get("/hello")
  async def hello_world(user: AuthedUser):
    example_store: ExampleStaticDocumentStore = container[ExampleStaticDocumentStore]
    doc = await example_store.create()
    return {
      "message": f"Hello {user.name}. Your id is {user.id}. We created a static doc for you: {doc}"
    }
  
  return [router]
```

**Effective path**: `GET /api/modules/static/hello`

**Behavior**:

* Inserts a new document into the `example_static` collection via `ExampleStaticDocumentStore.create()`.
* Returns a message containing the user’s name, id, and the created document payload.

---

## Notes & Tips

* **Auth & middleware**: Platform middlewares (authentication/authorization, logging, CORS, rate limits) apply to module routes automatically.
* **Container**: Prefer binding long-lived services in `init_module` and retrieving them in handlers; this avoids repeated construction.
* **Prefixes**: Keep router prefixes short and descriptive (e.g., `/static`, `/my-feature`). They’ll be appended after `/api/modules`.
* **Testing quickly**: After your app starts, call your endpoint (e.g., `GET /api/modules/static/hello`) with a valid session token to verify both auth and storage.

---

## Summary

* Your module must export `init_module(container)` and `shutdown_module()`.
* Return one or more routers from `get_routers(container)`.
* Routes are available under `/api/modules/...`, combining your router prefix and paths.

That’s it — your module can now expose new API endpoints without changing Flux0 core.
