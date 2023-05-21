import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStack } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from '../pages/auth/Auth';
import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register/Register';
import {
  AdminBarber,
  Admin,
  AdminBarnberForm,
  AdminService,
  AdminServiceForm,
} from '../pages/admin';
import { Profile } from '../pages/profile/Profile';
import { Header } from '../components/header';
import { AppointmentFirst } from '../pages/appointment';

const Stack = createNativeStackNavigator<RootStack>();

const Router = () => {
  const headerOptions = {
    header: () => <Header />,
  };
  const noHeaderOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} options={noHeaderOptions} />
        <Stack.Screen name="Login" component={Login} options={headerOptions} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={headerOptions}
        />
        <Stack.Screen name="Home" component={Home} options={noHeaderOptions} />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={headerOptions}
        />
        <Stack.Screen
          name="AdminHome"
          component={Admin}
          options={headerOptions}
        />

        <Stack.Screen
          name="AdminBarber"
          component={AdminBarber}
          options={headerOptions}
        />

        <Stack.Screen
          name="AdminBarberForm"
          component={AdminBarnberForm}
          options={headerOptions}
        />

        <Stack.Screen
          name="AdminServices"
          component={AdminService}
          options={headerOptions}
        />

        <Stack.Screen
          name="AdminServiceForm"
          component={AdminServiceForm}
          options={headerOptions}
        />

        <Stack.Screen
          name="AppointmentFirst"
          component={AppointmentFirst}
          options={headerOptions}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
