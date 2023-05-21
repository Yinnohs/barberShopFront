import { useContext, useEffect, useState } from 'react';
import {
  AppointmentContext,
  AuthContext,
  ThemeContext,
  IService,
  IBarber,
  IAppointmentData,
} from '../../context';
import { Layout } from '../layout';
import { SafeAreaView, View, Text } from 'react-native';
import {
  MultipleSelectList,
  SelectList,
} from 'react-native-dropdown-select-list';
import { getAllServices } from '../../api/service.api';
import { getAllUsersBarbers } from '../../api/user.api';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';
import { BasicButton } from '../../components/Buttons';
import { appTheme } from '../../theme';
import { StyleSheet } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';

export const AppointmentFirst = () => {
  const { theme } = useContext(ThemeContext);
  const { setAppointment } = useContext(AppointmentContext);
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [selectedBarber, setSelectedBarber] = useState<number>(0);
  const [services, setServices] = useState<IService[]>([]);
  const [barbers, setBarbers] = useState<IBarber[]>([]);

  const fetchServices = async () => {
    const fetchedServices = await getAllServices(authData.token);

    const serviceData = fetchedServices.map((service: IService) => {
      return {
        key: service?.id,
        value: service?.description,
      };
    });

    setServices(serviceData);
  };

  const fetchBarbers = async () => {
    const fetchedBarbers = await getAllUsersBarbers(authData.token);

    const barberData = fetchedBarbers.map((barber: IBarber) => {
      return {
        key: barber?.id,
        value: `${barber.name} ${barber.surname}`,
      };
    });

    setBarbers(barberData);
  };

  const handleInitialLoad = async () => {
    const services = fetchServices();
    const barbers = fetchBarbers();
    await Promise.all([services, barbers]);
  };

  const handleNextStep = () => {
    const appointment: IAppointmentData = {
      barberId: selectedBarber,
      service: selectedServices,
      userId: 0,
      scheduledDateTime: '',
    };
    setAppointment(appointment);
    navigation.navigate('AppointmentSecond');
  };

  useEffect(() => {
    handleInitialLoad();
  }, []);

  return (
    <Layout>
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.containerColumn]}>
          <Text
            style={[styles.textLabel, { color: appTheme[theme].colorPrimary }]}
          >
            Elige un barbero:
          </Text>
          <SelectList
            boxStyles={{ backgroundColor: appTheme[theme].colorSurface }}
            dropdownItemStyles={{ borderColor: appTheme[theme].colorPrimary }}
            inputStyles={{ color: appTheme[theme].colorPrimary }}
            dropdownStyles={{ backgroundColor: appTheme[theme].colorSurface }}
            data={barbers}
            setSelected={(id: number) => setSelectedBarber(id)}
            save="key"
            searchPlaceholder="Busca un barbero"
            placeholder="Busca un barbero"
            closeicon={<SearchIcon />}
            arrowicon={<ArrowIcon />}
          />
          <Text
            style={[styles.textLabel, { color: appTheme[theme].colorPrimary }]}
          >
            Elige los servicios:
          </Text>
          <MultipleSelectList
            boxStyles={{ backgroundColor: appTheme[theme].colorSurface }}
            dropdownItemStyles={{ borderColor: appTheme[theme].colorPrimary }}
            inputStyles={{ color: appTheme[theme].colorPrimary }}
            dropdownStyles={{ backgroundColor: appTheme[theme].colorSurface }}
            labelStyles={{ color: appTheme[theme].colorPrimary }}
            badgeStyles={{
              backgroundColor: appTheme[theme].colorBackground,
            }}
            data={services}
            setSelected={(id: number[]) => setSelectedServices(id)}
            save="key"
            closeicon={<SearchIcon />}
            arrowicon={<ArrowIcon />}
            searchPlaceholder="Busca un servicio"
            placeholder="Bsuca un servicio"
          />
        </View>

        <View style={[styles.containerRow]}>
          <BasicButton
            action={() => navigation.navigate('Home')}
            bgColor={appTheme[theme].colorSecondary}
            height={60}
            width={150}
            rounded={true}
            textColor={appTheme[theme].colorPrimary}
            title="Cancelar"
            type="outline"
            textSize={20}
          />

          <BasicButton
            action={handleNextStep}
            bgColor={appTheme[theme].colorPrimary}
            height={60}
            width={150}
            rounded={true}
            textColor={appTheme[theme].colorSurface}
            title="Siguiente Paso"
            type="filled"
            textSize={20}
          />
        </View>
      </SafeAreaView>
    </Layout>
  );
};

const SearchIcon = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      name="search"
      style={[{ color: appTheme[theme].colorSecondary, fontSize: 25 }]}
    />
  );
};

const ArrowIcon = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <Icon
      name="keyboard-arrow-down"
      style={[{ color: appTheme[theme].colorSecondary, fontSize: 25 }]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  containerRow: {
    height: '50%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  containerColumn: {
    height: '70%',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  textLabel: {
    fontSize: 20,
  },
});
