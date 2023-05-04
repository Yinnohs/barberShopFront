import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStack } from './types';
import { NavigationContainer } from '@react-navigation/native';
import { Auth } from '../pages/auth/Auth';
import { Login } from '../pages/login';
import { Home } from '../pages/home';
import { Register } from '../pages/register/Register';

const Stack = createNativeStackNavigator<RootStack>();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Auth"
          component={Auth}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerBackTitleVisible: false, title: '' }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerBackTitleVisible: false, title: '' }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
