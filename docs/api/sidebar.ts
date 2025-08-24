import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/flux-0-api",
    },
    {
      type: "category",
      label: "agents",
      items: [
        {
          type: "doc",
          id: "api/list-agents",
          label: "List Agents",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-agent",
          label: "Create Agent",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/retrieve-agent",
          label: "Retrieve Agent",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "sessions",
      items: [
        {
          type: "doc",
          id: "api/create-session",
          label: "Create Session",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-sessions",
          label: "List Sessions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/retrieve-session",
          label: "Retrieve Session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/create-event-and-stream",
          label: "Create Event and Stream",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/list-session-events",
          label: "List Events",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
