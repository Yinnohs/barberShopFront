// context/todoContext.tsx
import { FC, createContext, useState } from 'react';

export type TRole = 'CLIENT' | 'ADMIN' | 'BARBER';

export interface IAuthData {
  role: TRole;
  isLogged: boolean;
  token: string;
  rToken: string;
}

export interface IAuthContext {
  authData: IAuthData;
  setAuthData: Function;
}

export const AuthContext = createContext<IAuthContext>({
  authData: { role: 'CLIENT', isLogged: false, token: '', rToken: '' },
  setAuthData: () => {},
});

export const AuthProvider: FC<any> = ({ children }) => {
  const [authData, setAuthData] = useState<IAuthData>({
    role: 'CLIENT',
    isLogged: false,
    token: '',
    rToken: '',
  });

  return (
    <AuthContext.Provider value={{ authData, setAuthData: setAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
