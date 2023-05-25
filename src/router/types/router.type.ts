import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStack = {
  Auth: any;
  AdminHome: any;
  AdminBarber: any;
  AdminServices: any;
  AdminBarberForm: any;
  AdminBarberFormUpdate: any;
  AdminServiceForm: any;
  AdminServiceFormUpdate: any;
  Home: any;
  Profile: any;
  Login: any;
  Register: any;
  AppointmentFirst: any;
  AppointmentSecond: any;
  Schedules: any;
};

export type AuthRouteType = NativeStackNavigationProp<any, 'Auth'>;

export type RootStackRoutingString = keyof RootStack;

export type RouteStackSelection<T extends ParamListBase> =
  NativeStackNavigationProp<T, keyof T>;
