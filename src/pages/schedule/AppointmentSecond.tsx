import { useContext } from 'react';
import { ThemeContext } from '../../context';
import { Layout } from '../layout';
import { View } from 'react-native';

export const AppointmentSecond = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Layout>
      <View></View>
    </Layout>
  );
};
