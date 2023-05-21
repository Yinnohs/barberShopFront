import { useContext, useEffect } from 'react';
import { AppointmentContext, AuthContext, ThemeContext } from '../../context';
import { Layout } from '../layout';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';

export const AppointmentSecond = () => {
  const { theme } = useContext(ThemeContext);
  const { setAppointment } = useContext(AppointmentContext);
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  const fetchBarberSchedule = () => {};
  const initialLoad = () => {};
  const handleCancel = () => {
    return navigation.navigate('AppointmentFirst');
  };

  useEffect(() => {
    initialLoad();
  }, []);

  return (
    <Layout>
      <SafeAreaView></SafeAreaView>
    </Layout>
  );
};
