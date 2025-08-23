---
id: record-replay
title: Session Recording & Replay
sidebar_label: Recording & Replay
---

Record and replay sessions exactly as the client saw them. This is useful for development, debugging, demos, incident repro, and cost‑effective regression runs—without hitting your LLM/tools again.

## Overview

- **Record mode** captures everything streamed to the client during a session.
- **Replay mode** creates a new session that replays a prior recording instead of calling the LLM and tools.
- Replay can be **paced** (match captured timing, run faster, slower, or instantly) and always **stops at the next user event** so conversations remain interactive.

> **Cost benefit:** Replaying avoids provider calls, enabling low‑cost demos, development, and reproducible tests.

---

## Recording

Create a session with `mode = "record"`. The created session will include the recording id in its metadata.

```http title="POST /sessions (recording)"
Content-Type: application/json

{
  "agent_id": "k75P208WN6",
  "title": "My Recorded Session",
  "mode": "record"
}
```

**Example response**

```json {13}
{
  "id": "t2Ykiruy65",
  "agent_id": "k75P208WN6",
  "user_id": "9Eys1OfjzO",
  "mode": "record",
  "title": "My Recorded Session",
  "consumption_offsets": {
    "client": 0
  },
  "created_at": "2025-08-24T18:20:18.001821Z",
  "metadata": {
    "recording": {
      "recording_id": "NFoW8vKYTo"
    }
  }
}
```

**What gets recorded**

- A single **header** record at `offset=0` linking to the source session.
- All **chunk** updates exactly as streamed to the client.
- **Status** and other emitted events needed for the client stream.
- **User message** events (source=`user`) as turn anchors.

**What is not duplicated**

- Final AI `message` events are not stored in the recording (they already persist to the session).

---

## Replay

Replay is performed by a special agent of type `replay`, which streams responses from the recording instead of interacting with the LLM and tools. To enable replay, you must first register a replay agent:

```sh
flux0 agents create --type replay --name "replay_agent"
```

Then create a new session with `mode = "replay"` and provide the recording to play. Use the id of this replay agent as the `agent_id`, and the `recording_id` from the [recording](#recording).

```http title="POST /sessions (replay)" {4,9}
Content-Type: application/json

{
  "agent_id": "<replay_agent_id>",
  "title": "Replay of rec_abc",
  "mode": "replay",
  "metadata": {
    "replay": {
      "recording_id": "<recording_id>",
      "pacing": 1.0
    }
  }
}
```

**Required**

- `metadata.replay.recording_id` — the id from the recording stored in the original session’s metadata.

**Optional**

- `pacing` — how to time the replay (defaults to `1.0`):
  - `0.0` → **instant** (no delays)
  - `1.0` → **recorded-time** (match captured timing)
  - `< 1.0` → **faster** (e.g., `0.5` ≈ 2× speed)
  - `> 1.0` → **slower** (e.g., `2.0` ≈ half speed)

**Turn boundaries**

- Replay streams until the next **user** event, then pauses. This keeps multi‑turn conversations interactive.

---

## Typical flow

1. **Create (record)**: [POST /api/sessions](/docs/api/create-session) with `mode="record"` → note `metadata.recording.recording_id` in the session.
2. **Stream (record)** as usual: [POST /sessions/:session_id/events/stream](/docs/api/create-session-event).
3. **Create (replay)**: [POST /api/sessions](/docs/api/create-session) with `mode="replay"` and `metadata.replay.recording_id`.
4. **Stream (replay)**: [POST /sessions/:session_id/events/stream](/docs/api/create-session-event) to receive recorded events.
5. **Iterate**: When replay stops at the next user anchor, repeat step 4 to continue the next turn or trigger another run.

---

## Notes & limits

- Recording captures exactly what was streamed to the client.
- Turn anchors are based on **user** events.

---

## FAQ

**Can I replay instantly?**  
Yes — set `pacing` to `0.0`.

**Do I pay LLM/tool costs during replay?**  
No. Replay re‑emits recorded frames without invoking providers.

**What about privacy?**  
Recording stores the exact frames sent to the client. Apply your own redaction or retention policies as needed.

---

## Troubleshooting

- **Replay doesn’t advance**: Verify `metadata.replay.recording_id` is set and that the original recording contains user‑anchored turns.
