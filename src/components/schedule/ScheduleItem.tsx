import { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IService } from '../../context/services/ServicesContext';
import { IBarber, ISchedule, ThemeContext } from '../../context';
import { appTheme } from '../../theme';
import moment from 'moment';

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

export const ScheduleItem: FC<TScheduleItem> = ({
  name,
  surname,
  openModalFunction,
  scheduleId,
  services,
  scheduledDateTime,
}) => {
  const { theme } = useContext(ThemeContext);

  const [showService, setShowService] = useState<IShowService>(
    {} as IShowService,
  );

  const currentDate = moment(scheduledDateTime);

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
      <View style={[styles.sectionCol]}>
        <View style={[styles.texSection]}>
          <Text
            style={[
              styles.textSize,
              { color: appTheme[theme].colorPrimary, fontWeight: '800' },
            ]}
          >
            Barbero:
          </Text>
          <Text
            style={[styles.textSize, { color: appTheme[theme].colorPrimary }]}
          >
            {`${name} ${surname}`}
          </Text>
        </View>

        <View style={[styles.texSection]}>
          <Text
            style={[
              styles.textSize,
              { color: appTheme[theme].colorPrimary, fontWeight: '800' },
            ]}
          >
            Servicios:
          </Text>
          <Text
            style={[styles.textSize, { color: appTheme[theme].colorPrimary }]}
          >
            {`${showService.services}`}
          </Text>
        </View>

        <View style={[styles.texSection]}>
          <Text
            style={[
              styles.textSize,
              {
                color: appTheme[theme].colorPrimary,
                fontWeight: '800',
              },
            ]}
          >
            Total:
          </Text>
          <Text
            style={[styles.textSize, { color: appTheme[theme].colorPrimary }]}
          >
            {`${showService.price} €`}
          </Text>
        </View>

        <View style={[styles.texSection]}>
          <Text
            style={[
              styles.textSize,
              { color: appTheme[theme].colorPrimary, fontWeight: '800' },
            ]}
          >
            Fecha:
          </Text>
          <Text
            style={[styles.textSize, { color: appTheme[theme].colorPrimary }]}
          >
            {`${currentDate.locale('es_ES').format('dddd Do MMMM YYYY')}`}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '90%',
    height: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
  },
  textSize: {
    fontSize: 15,
  },
  section: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  sectionCol: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  texSection: {
    width: '80%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
