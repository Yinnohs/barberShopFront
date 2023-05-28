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
import { SafeAreaView, View, Text, Alert } from 'react-native';
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
  const [services, setServices] = useState<{ key: number; value: string }[]>(
    [],
  );
  const [barbers, setBarbers] = useState<{ key: number; value: string }[]>([]);

  const fetchServices = async () => {
    const fetchedServices = await getAllServices(authData.token);

    const serviceData = fetchedServices.map((service: IService) => {
      return {
        key: service?.id,
        value: service?.description + ' ' + service?.price + '€',
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
    if (selectedServices.length <= 0 || selectedBarber <= 0) {
      Alert.alert(
        'Ni el servicio a pedir ni el barbero pueden estar sin seleccionar',
      );
    }

    const appointment: IAppointmentData = {
      barberId: selectedBarber,
      service: selectedServices,
      scheduledDateTime: '',
    };
    setAppointment(appointment);
    navigation.navigate('AppointmentSecond');
  };

  const isDisable = selectedServices.length <= 0 || selectedBarber <= 0;

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
            dropdownTextStyles={{ color: appTheme[theme].colorPrimary }}
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
            dropdownTextStyles={{ color: appTheme[theme].colorPrimary }}
            boxStyles={{ backgroundColor: appTheme[theme].colorSurface }}
            dropdownItemStyles={{ borderColor: appTheme[theme].colorPrimary }}
            inputStyles={{ color: appTheme[theme].colorPrimary }}
            dropdownStyles={{ backgroundColor: appTheme[theme].colorSurface }}
            labelStyles={{ color: appTheme[theme].colorSecondary }}
            badgeStyles={{
              backgroundColor:
                theme === 'dark'
                  ? appTheme[theme].colorBackground
                  : appTheme[theme].colorSecondary,
            }}
            data={services}
            setSelected={(id: number[]) => setSelectedServices(id)}
            save="key"
            closeicon={<SearchIcon />}
            arrowicon={<ArrowIcon />}
            searchPlaceholder="Busca un servicio"
            placeholder="Busca un servicio"
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
            disable={isDisable}
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
