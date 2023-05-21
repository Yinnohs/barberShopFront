import axios from 'axios';
import { baseRoute } from './constant';

const baseApi = axios.create({
  baseURL: baseRoute + 'schedule/',
});

export const getUserCurrentSchedules = async (token: string) => {
  try {
    const { data } = await baseApi.get('my/schedules', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getBarberSchedules = async (token: string, barberId: number) => {
  try {
    const { data } = await baseApi.get(`barber/${barberId}/schedules/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createSchedule = async (token: string, payload: any) => {
  try {
    const { data } = await baseApi.post(``, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(Error);
  }
};
