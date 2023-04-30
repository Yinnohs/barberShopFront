import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStack } from './types';
import { NavigationContainer } from '@react-navigation/native';
import Auth from '../pages/auth/Auth';

const Stack = createNativeStackNavigator<RootStack>();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
