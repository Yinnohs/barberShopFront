import axios from 'axios';
import { baseRoute } from './constant';
import { TUpdateUser } from '../types';

const baseApi = axios.create({
  baseURL: baseRoute + 'user/',
});

export const getAllUsers = async (token: string) => {
  try {
    const { data } = await baseApi.get('all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getuserInformation = async (token: string) => {
  try {
    const { data } = await baseApi.get('information', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsersBarbers = async (token: string) => {
  try {
    const { data } = await baseApi.get('all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (payload: TUpdateUser, token: string) => {
  try {
    const { data } = await baseApi.put('information/update', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
