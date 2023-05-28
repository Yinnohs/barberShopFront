import { useContext, useEffect, useState } from 'react';
import { AuthContext, ThemeContext } from '../../context';
import { Layout } from '../layout';
import { Alert, SafeAreaView, Text } from 'react-native';
import {
  getBarberSchedulesCurrentBarber,
  getUserCurrentSchedules,
} from '../../api';

import { ScheduleList } from '../../components/schedule/ScheduleList';
import { appTheme } from '../../theme';

export const Schedule = () => {
  const { theme } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchSchedules = async () => {
    let data: any = null;

    if (authData.role === 'CLIENT') {
      data = await getUserCurrentSchedules(authData.token);
    } else {
      data = await getBarberSchedulesCurrentBarber(authData.token);
    }

    if (!data) {
      Alert.alert('Algo salió mal al consguir las citas');
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
        <Text
          style={{
            fontSize: 30,
            color: appTheme[theme].colorPrimary,
            textAlign: 'center',
            marginBottom: 15,
          }}
        >
          Mis Citas
        </Text>
        <ScheduleList schedules={schedules} />
      </SafeAreaView>
    </Layout>
  );
};
