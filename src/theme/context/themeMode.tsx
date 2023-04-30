// context/todoContext.tsx
import { FC, createContext } from 'react';
import { useColorScheme } from 'react-native/types';

export type ThemeType = 'light' | 'dark';

export const ThemmeContext = createContext<ThemeType | null>(null);
export const ThemeContextProvider = ThemmeContext.Provider;

const themeStartingState = useColorScheme() || 'light';

export const ThemeProvider: FC<any> = ({ children }) => {
  return (
    <ThemeContextProvider value={themeStartingState}>
      {children}
    </ThemeContextProvider>
  );
};
