import Router from './src/router/Router';
import {
  AuthProvider,
  ThemeProvider,
  AppointmentProvider,
} from './src/context';
import React from 'react';

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppointmentProvider>
          <Router />
        </AppointmentProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
