// context/todoContext.tsx
import { FC, createContext, useState } from 'react';
import { Appearance, ColorSchemeName, useColorScheme } from 'react-native';

export interface IThemeContext {
  theme: 'light' | 'dark';
  setTheme: Function;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: FC<any> = ({ children }) => {
  const themeValue = useColorScheme();
  console.log({ themeValue });
  const initialValue =
    themeValue === null || themeValue === undefined ? 'dark' : themeValue;

  console.log(themeValue);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
