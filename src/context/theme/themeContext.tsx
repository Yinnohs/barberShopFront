// context/todoContext.tsx
import { Dispatch, FC, createContext, useState } from 'react';

export interface IThemeContext {
  theme: 'light' | 'dark';
  setTheme: Dispatch<React.SetStateAction<'light' | 'dark'>>;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: FC<any> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
