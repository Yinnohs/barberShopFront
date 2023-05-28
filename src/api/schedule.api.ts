import axios from 'axios';
import { baseRoute } from './constant';

interface ICreateSchedulePayload {
  barberId: number;
  service: number[];
  scheduledDateTime: Date | string;
}

const baseApi = axios.create({
  baseURL: baseRoute + 'schedule/',
});

export const getUserCurrentSchedules = async (token: string) => {
  try {
    const { data } = await baseApi.get('my/', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBarberSchedules = async (
  token: string,
  barberId: number,
  payload: { currentDate: string },
) => {
  try {
    const { data } = await baseApi.post(
      `barber/${barberId}/schedules/`,
      payload,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBarberSchedulesCurrentBarber = async (token: string) => {
  try {
    const { data } = await baseApi.get(`barber/schedules/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createSchedule = async (
  token: string,
  payload: ICreateSchedulePayload,
) => {
  try {
    const { data } = await baseApi.post(``, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(Error);
  }
};
