import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStack = {
  Auth: undefined;
  AdminHome: undefined;
  AdminBarber: undefined;
  AdminServices: undefined;
  AdminBarberForm: undefined;
  AdminServiceForm: undefined;
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
  AppointmentFirst: undefined;
  AppointmentSecond: undefined;
  Schedules: undefined;
};

export type AuthRouteType = NativeStackNavigationProp<any, 'Auth'>;

export type RootStackRoutingString = keyof RootStack;

export type RouteStackSelection<T extends ParamListBase> =
  NativeStackNavigationProp<T, keyof T>;
