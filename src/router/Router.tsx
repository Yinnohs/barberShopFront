import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStack } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from '../pages/auth/Auth';
import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register/Register';
import { useContext } from 'react';
import { ThemeContext } from '../context';
import { appTheme } from '../theme';
import {
  AdminBarber,
  Admin,
  AdminBarnberForm,
  AdminService,
  AdminServiceForm,
} from '../pages/Admin';
import { Profile } from '../pages/Profile/Profile';

const Stack = createNativeStackNavigator<RootStack>();

const Router = () => {
  const { theme } = useContext(ThemeContext);

  const headerBase = {
    headerBackTitleVisible: false,
    title: '',
    headerTintColor: appTheme[theme].colorPrimary,
    headerStyle: { backgroundColor: appTheme[theme].colorBackground },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={Login} options={headerBase} />
        <Stack.Screen
          name="Register"
          component={Register}
          options={headerBase}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="AdminHome" component={Admin} options={headerBase} />

        <Stack.Screen
          name="AdminBarber"
          component={AdminBarber}
          options={headerBase}
        />

        <Stack.Screen
          name="AdminBarberForm"
          component={AdminBarnberForm}
          options={headerBase}
        />

        <Stack.Screen
          name="AdminServices"
          component={AdminService}
          options={headerBase}
        />

        <Stack.Screen
          name="AdminServiceForm"
          component={AdminServiceForm}
          options={headerBase}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
