import { useContext, useEffect, useState } from 'react';
import { AuthContext, ThemeContext } from '../../context';
import { Layout } from '../layout';
import { Alert, SafeAreaView, Text } from 'react-native';
import {
  getBarberSchedulesCurrentBarber,
  getUserCurrentSchedules,
} from '../../api';

import { ScheduleList } from '../../components/schedule/ScheduleList';

export const Schedule = () => {
  const { theme } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);

  const fetchSchedules = async () => {
    let data: any = null;

    authData.role === 'BARBER' || authData.role === 'ADMIN'
      ? (data = await getBarberSchedulesCurrentBarber(authData.token))
      : (data = await getUserCurrentSchedules(authData.token));

    if (!data) {
      Alert.alert('Algo salió mal al consguire las citas');
    } else {
      setSchedules(data);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  return (
    <Layout>
      <SafeAreaView>
        <Text>Mis Citas</Text>
        <ScheduleList
          schedules={schedules}
          openCloseModal={setIsOpen}
          setIdToDelete={setIdToDelete}
        />
      </SafeAreaView>
    </Layout>
  );
};
