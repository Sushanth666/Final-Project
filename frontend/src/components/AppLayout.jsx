import React from 'react';
import Layout from './Layout';

export default function AppLayout({ theme, setTheme }) {
  return (
    <Layout theme={theme} setTheme={setTheme}>
      {/* Outlet here renders pages */}
    </Layout>
  );
}
