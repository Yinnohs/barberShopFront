import { View } from 'react-native';
import { Layout } from '../layout';
import { useContext, useEffect, useState } from 'react';
import { getAllServices } from '../../api/service';
import { ThemeContext, AuthContext } from '../../context';
import { IService } from '../../context/services/ServicesContext';

export const Home = () => {
  const { theme } = useContext(ThemeContext);
  const [cServices, setCServices] = useState<IService[]>();
  const { authData } = useContext(AuthContext);

  const fetchServices = async () => {
    const fetchedServices = await getAllServices(authData.token);
    setCServices(fetchedServices);
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <Layout>
      <View style={{ flex: 1 }}></View>
    </Layout>
  );
};
