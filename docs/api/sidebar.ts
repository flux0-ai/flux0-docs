import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "api/fastapi",
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
          label: "Create a new session",
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
          id: "api/create-session-event",
          label: "Create and stream session events",
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
