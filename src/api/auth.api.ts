import { TSignUpPayload, TSingInPayload } from '../types';
import axios from 'axios';
import { baseRoute } from './constant';

export const singUpUser = async (payload: TSignUpPayload) => {
  try {
    const { data } = await axios.post(`${baseRoute}auth/local/signup`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const signInUser = async (payload: TSingInPayload) => {
  try {
    const { data } = await axios.post(`${baseRoute}auth/local/signin`, payload);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getStatus = async () => {
  const { data } = await axios.get('/api/v1/auth/');
  return data;
};

export const singUpBarber = async (payload: TSignUpPayload, token: string) => {
  try {
    const { data } = await axios.post(
      `${baseRoute}auth/local/signup/barber`,
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
