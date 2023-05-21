export const ScheduleItem = () => {};
import { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IService } from '../../context/services/ServicesContext';
import { AuthContext, IBarber, ISchedule, ThemeContext } from '../../context';
import { appTheme } from '../../theme';
import Icon from '@expo/vector-icons/MaterialIcons';

interface IItem {
  openModalFunction: Function;
}

type TScheduleItem = Partial<IBarber & ISchedule> &
  IItem & {
    services: IService[];
  };

interface IShowService {
  services: string;
  price: number;
}

export const ServiceItem: FC<TScheduleItem> = ({
  name,
  surname,
  openModalFunction,
  scheduleId,
  services,
}) => {
  const { theme } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);

  const [showService, setShowService] = useState<IShowService>(
    {} as IShowService,
  );

  const formatServices = () => {
    const serviceData: IShowService = services.reduce(
      (prev: IShowService, current: IService, i: number) => {
        prev.services += `${current.description}\n`;
        prev.price += current.price;
        return prev;
      },
      {
        price: 0,
        services: '',
      },
    );

    setShowService(serviceData);
  };

  useEffect(() => {
    if (services.length > 0) {
      formatServices();
    }
  }, []);

  return (
    <View
      style={[
        styles.item,
        { backgroundColor: appTheme[theme].colorSurface },
        appTheme[theme].shadowOne,
      ]}
    >
      <TouchableOpacity style={[styles.section]}>
        <Text
          style={[styles.textSize, { color: appTheme[theme].colorPrimary }]}
        >
          {`${name} ${surname}`}
        </Text>
        <Text
          style={[styles.textSize, { color: appTheme[theme].colorPrimary }]}
        >
          {``}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openModalFunction(scheduleId)}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '25%',
            height: '100%',
          },
        ]}
      >
        <Icon
          style={{
            color: appTheme.colorWarning,
            textAlign: 'center',
            fontSize: 40,
          }}
          name="delete"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
  },
  textSize: {
    fontSize: 20,
  },
  section: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});
