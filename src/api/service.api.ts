import axios from 'axios';
import { baseRoute } from './constant';
import {
  TServiceCreationPayload,
  TServiceUpdatePayload,
} from '../types/service.api.type';

const baseApi = axios.create({
  baseURL: baseRoute + 'service/',
});

export const createService = async (
  payload: TServiceCreationPayload,
  token: string,
) => {
  try {
    const { data } = await baseApi.post('', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllServices = async (token: string) => {
  try {
    const { data } = await baseApi.get('all', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOneService = async (id: number, token: string) => {
  try {
    const { data } = await baseApi.get(`${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateService = async (
  payload: TServiceUpdatePayload,
  token: string,
) => {
  try {
    const { data } = await baseApi.put('', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteService = async (id: number, token: string) => {
  try {
    const { data } = await baseApi.delete(`${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const hardDeleteService = async (id: number, token: string) => {
  try {
    const { data } = await baseApi.delete(`hard/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
