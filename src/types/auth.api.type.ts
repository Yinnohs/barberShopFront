export interface IUser {
  id: number;
  email: string;
  name: string;
  surname: string;
  password: string;
  schedules: string[];
}

export type TSignUpPayload = Omit<IUser, 'id' | 'schedules'>;
export type TSingInPayload = Omit<TSignUpPayload, 'name' | 'surname'>;

export interface IAuthResponse {
  access_token: string;
  refresh_token: String;
}
