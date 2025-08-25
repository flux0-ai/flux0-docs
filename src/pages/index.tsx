import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import type { ReactNode } from 'react';

import Home from '../components/home';

export default function HomePage(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - A powerful framework for deploying AI agents`}
      description="The Flux0 API enables developers to create, manage and deploy AI agents, interact with them via sessions, and handle event streaming using JSONPatch (RFC 6902). It is designed to support multi-agent workflows, facilitate LLM-agnostic integrations, and provide structured interactions with AI-powered assistants. The API is ideal for orchestrating intelligent assistants, tracking interactions, and ensuring dynamic and responsive AI applications.">

      <Home />
    </Layout>
  );
}
