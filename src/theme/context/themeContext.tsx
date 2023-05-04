// context/todoContext.tsx
import { FC, createContext, useState } from 'react';
import { ColorSchemeName, useColorScheme } from 'react-native';

export interface IThemeContext {
  theme: ColorSchemeName;
  setTheme: Function;
}

export const ThemeContext = createContext<IThemeContext>({
  theme: 'light',
  setTheme: () => {},
});

export const ThemeProvider: FC<any> = ({ children }) => {
  const [theme, setTheme] = useState<ColorSchemeName>('light');

  const handleThemeChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};
