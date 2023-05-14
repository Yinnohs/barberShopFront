import { View, Text, StyleSheet } from 'react-native';
import { appTheme } from '../../../theme';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, ThemeContext } from '../../../context';
import { Layout } from '../../layout';
import { BasicButton } from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';
import { ServiceList } from '../../../components/services';
import { ServicesContext } from '../../../context/services/ServicesContext';
import { Loader } from '../../../components/loader';
import { getAllServices } from '../../../api/service';
import { IService } from '../../../context/services/ServicesContext';

export const AdminService = () => {
  const { theme } = useContext(ThemeContext);
  const { services, setServices } = useContext(ServicesContext);
  const [cServices, setCServices] = useState<IService[]>();
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  const fetchServices = async () => {
    const fetchedServices = await getAllServices(authData.token);
    setCServices(fetchedServices);
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <Layout>
      <View style={[styles.container]}>
        <View
          style={[styles.childContainer, { justifyContent: 'space-evenly' }]}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: appTheme[theme].colorPrimary,
            }}
          >
            Servicios
          </Text>
          <BasicButton
            action={() => navigation.navigate('AdminServiceForm')}
            bgColor={appTheme[theme].colorPrimary}
            rounded
            height={'35%'}
            textColor={appTheme[theme].colorPrimary}
            title="Crear un nuevo Servicio + 1"
            textSize={20}
            type="outline"
            width={'70%'}
          />
        </View>
        {/*TODO: create a list of current barbers in the app*/}
        <View style={[{ width: '80%', alignItems: 'center' }]}>
          <ServiceList services={cServices!} />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  childContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
