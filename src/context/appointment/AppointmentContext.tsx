import { FC, createContext, useState } from 'react';

export interface IAppointmentData {
  barberId: number;
  userId: number;
  service: number[];
  scheduledDateTime: string;
}

export interface ISchedule {
  scheduleId: number;
  barberId: number;
  userId: number;
  service: number[];
  scheduledDateTime: string;
}

export interface IAppointment {
  appointment: IAppointmentData;
  setAppointment: Function;
}

export const AppointmentContext = createContext<IAppointment>({
  appointment: {
    barberId: 0,
    userId: 0,
    service: [] as number[],
    scheduledDateTime: '',
  },
  setAppointment: () => {},
});

export const AppointmentProvider: FC<any> = ({ children }) => {
  const [appointment, setAppointment] = useState<IAppointmentData>({
    barberId: 0,
    userId: 0,
    service: [] as number[],
    scheduledDateTime: '',
  });

  return (
    <AppointmentContext.Provider value={{ appointment, setAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
};
