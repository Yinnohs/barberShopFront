// context/todoContext.tsx
import { FC, createContext, useState } from 'react';

export interface IService {
  id: number;
  description: string;
  price: number;
}

export interface IServiceContext {
  services: IService[];
  setServices: Function;
}

export const ServicesContext = createContext<IServiceContext>({
  services: [] as IService[],
  setServices: () => {},
});

export const ServicesProvider: FC<any> = ({ children }) => {
  const [services, setServices] = useState<IService[]>([] as IService[]);

  return (
    <ServicesContext.Provider value={{ services, setServices }}>
      {children}
    </ServicesContext.Provider>
  );
};
