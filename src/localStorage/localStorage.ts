import * as SecureStore from 'expo-secure-store';
import { GLOBAL_KEYS } from './globalKeys';

export const saveAccessToken = async (token: string) => {
  await SecureStore.setItemAsync(GLOBAL_KEYS.access_token, token);
};

export const saveRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync(GLOBAL_KEYS.refresh_troken, token);
};

export const getRefreshToken = async () => {
  await SecureStore.getItemAsync(GLOBAL_KEYS.refresh_troken);
};

export const getAccessToken = async () => {
  await SecureStore.getItemAsync(GLOBAL_KEYS.access_token);
};
