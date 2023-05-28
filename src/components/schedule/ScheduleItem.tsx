import { FC, useContext, useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IService } from '../../context/services/ServicesContext';
import { IBarber, ISchedule, ThemeContext } from '../../context';
import { appTheme } from '../../theme';
import moment from 'moment';

interface IServiceStringPrice {
  id: number;
  description: string;
  price: string;
}

type TScheduleItem = Partial<IBarber & ISchedule> & {
  services: IServiceStringPrice[];
};

interface IShowService {
  services: string;
  price: number;
}

export const ScheduleItem: FC<TScheduleItem> = ({
  name,
  surname,
  services,
  scheduledDateTime,
}) => {
  const { theme } = useContext(ThemeContext);

  const [showService, setShowService] = useState<IShowService>(
    {} as IShowService,
  );

  const currentDate = moment(scheduledDateTime);

  const formatServices = () => {
    const serviceData: IShowService = {
      price: 0,
      services: '',
    };

    services.forEach((service: IServiceStringPrice, i: number) => {
      serviceData.price += parseFloat(service.price);
      serviceData.services += `${service.description},`;
    });

    if (serviceData.services.split(',').length > 3) {
      const serviceArray = serviceData.services.split(',').slice(0, 3);
      serviceArray.push('...');
      serviceData.services = serviceArray.join(',');
    }

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
            style={[
              styles.textSize,
              { color: appTheme[theme].colorPrimary, fontSize: 12 },
            ]}
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
