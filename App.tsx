import Router from './src/router/Router';
import { AuthProvider, ThemeProvider, BarbersProvider } from './src/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

const client = new QueryClient();

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <QueryClientProvider client={client}>
          <Router />
        </QueryClientProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
