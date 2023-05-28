import React, { useContext, useEffect, useState } from 'react';
import {
  AppointmentContext,
  AuthContext,
  IAppointmentData,
  ThemeContext,
} from '../../context';
import { Layout } from '../layout';
import { SafeAreaView, Text, StyleSheet, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';
import {
  filterTimeSlots,
  getTimeSlotArray,
  getWeekDaySlots,
  transformToFormatHours,
  transformToFormatDays,
} from './appointment.utils';
import { SelectList } from 'react-native-dropdown-select-list';
import { appTheme } from '../../theme';
import Icon from '@expo/vector-icons/MaterialIcons';
import { createSchedule, getBarberSchedules } from '../../api';
import { BasicButton } from '../../components/Buttons';
import { Loader } from '../../components/loader';

const resetPayload: IAppointmentData = {
  barberId: 0,
  service: [],
  scheduledDateTime: '',
};

export const AppointmentSecond = () => {
  const { theme } = useContext(ThemeContext);
  const { appointment, setAppointment } = useContext(AppointmentContext);
  const { authData } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString());
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
  const [isLoading, setIsloading] = useState(false);
  const [weekDays, setWeekDays] = useState<{ key: string; value: string }[]>(
    [],
  );
  const [timeSlots, setTimeSlots] = useState<{ key: string; value: string }[]>(
    [],
  );

  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  const initialLoad = async () => {
    let timeSlots;
    let currentSelectedDate = new Date(selectedDate);
    currentSelectedDate.setHours(9);
    currentSelectedDate.setMinutes(0);
    currentSelectedDate.setSeconds(0);
    currentSelectedDate.setMilliseconds(0);
    let currentDate = new Date();
    currentDate.setHours(9);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    const selectedDateIsoString = currentSelectedDate.toISOString();

    const barberTakenAppointments = await getBarberSchedules(
      authData.token,
      appointment.barberId,
      { currentDate: selectedDateIsoString },
    );

    const weekDaysSlotsRaw = getWeekDaySlots(currentDate.toISOString());
    const transformedWeekSlots = weekDaysSlotsRaw.map((slot) => {
      return { key: slot, value: transformToFormatDays(slot) };
    });

    setWeekDays(transformedWeekSlots);

    const today = new Date().toISOString();
    const currentDates = getTimeSlotArray(today);

    timeSlots = currentDates;

    if (barberTakenAppointments.length > 0) {
      timeSlots = filterTimeSlots(currentDates, barberTakenAppointments);
    }

    const result = timeSlots.map((slot) => {
      return { key: slot, value: transformToFormatHours(slot) };
    });

    setTimeSlots(result);
  };

  const handleCancel = () => {
    return navigation.navigate('AppointmentFirst');
  };

  const handleSubmit = async () => {
    setIsloading(true);
    const payload: IAppointmentData = {
      barberId: appointment.barberId,
      service: appointment.service,
      scheduledDateTime: selectedTimeSlot,
    };

    const response = await createSchedule(authData.token, payload);

    if (!response) {
      setIsloading(false);
      Alert.alert('Algo raro ocurrió al reservar la cita');
    }

    setAppointment(resetPayload);

    setIsloading(false);
    navigation.navigate('Home');
  };

  useEffect(() => {
    initialLoad();
  }, [selectedDate]);

  return (
    <Layout>
      <SafeAreaView>
        <Text
          style={[styles.textLabel, { color: appTheme[theme].colorPrimary }]}
        >
          Elige un día de la semana
        </Text>
        <SelectList
          boxStyles={{ backgroundColor: appTheme[theme].colorSurface }}
          dropdownItemStyles={{ borderColor: appTheme[theme].colorPrimary }}
          dropdownTextStyles={{ color: appTheme[theme].colorPrimary }}
          inputStyles={{ color: appTheme[theme].colorPrimary }}
          dropdownStyles={{ backgroundColor: appTheme[theme].colorSurface }}
          setSelected={setSelectedDate}
          data={weekDays}
          save="key"
          searchPlaceholder="Busca un barbero"
          placeholder="Busca un barbero"
          closeicon={<SearchIcon />}
          arrowicon={<ArrowIcon />}
        />

        <Text
          style={[styles.textLabel, { color: appTheme[theme].colorPrimary }]}
        >
          Elige una hora:
        </Text>
        <SelectList
          boxStyles={{ backgroundColor: appTheme[theme].colorSurface }}
          dropdownItemStyles={{ borderColor: appTheme[theme].colorPrimary }}
          dropdownTextStyles={{ color: appTheme[theme].colorPrimary }}
          inputStyles={{ color: appTheme[theme].colorPrimary }}
          dropdownStyles={{ backgroundColor: appTheme[theme].colorSurface }}
          setSelected={setSelectedTimeSlot}
          data={timeSlots}
          save="key"
          searchPlaceholder="Busca un barbero"
          placeholder="Busca un barbero"
          closeicon={<SearchIcon />}
          arrowicon={<ArrowIcon />}
        />

        <View style={[styles.containerRow]}>
          <BasicButton
            action={handleCancel}
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
            action={handleSubmit}
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
      <Loader isVisible={isLoading} />
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
