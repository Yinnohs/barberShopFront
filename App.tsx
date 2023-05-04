import Router from './src/router/Router';
import { ThemeProvider } from './src/theme';

export default function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
