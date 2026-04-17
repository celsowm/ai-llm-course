import type { ReactNode } from 'react';

export interface Topic {
  id: string;          // globally unique
  title: string;       // localized
  path: string;        // /what-is-ai, /setup-venv, etc.
  helper?: string;
  render: () => ReactNode;
}
