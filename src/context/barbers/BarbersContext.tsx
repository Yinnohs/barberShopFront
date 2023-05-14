// context/todoContext.tsx
import { FC, createContext, useState } from 'react';

export interface IBarber {
  id: number;
  name: string;
  surname: string;
  email: string;
}

export interface IBarberContext {
  barbers: IBarber[];
  setBarbers: Function;
}

export const BarbersContext = createContext<IBarberContext>({
  barbers: [] as IBarber[],
  setBarbers: () => {},
});

export const BarbersProvider: FC<any> = ({ children }) => {
  const [barbers, setBarbers] = useState<IBarber[]>([] as IBarber[]);

  return (
    <BarbersContext.Provider value={{ barbers, setBarbers }}>
      {children}
    </BarbersContext.Provider>
  );
};
