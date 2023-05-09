import Router from './src/router/Router';
import { ThemeProvider } from './src/context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

export default function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={client}>
        <Router />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
