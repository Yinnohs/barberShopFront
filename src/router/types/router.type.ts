import { ParamListBase } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStack = {
  Auth: undefined;
  Admin: undefined;
  Home: undefined;
  Profile: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthRouteType = NativeStackNavigationProp<any, 'Auth'>;

export type RootStackRoutingString = keyof RootStack;

export type RouteStackSelection<T extends ParamListBase> =
  NativeStackNavigationProp<T, keyof T>;
