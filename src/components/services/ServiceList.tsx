import { FC, useContext, useEffect } from 'react';
import { IService } from '../../context/services/ServicesContext';
import { ThemeContext } from '../../context';
import { View, FlatList } from 'react-native';
import { ServiceItem } from './ServiceItem';

interface IServiceList {
  services: IService[];
}

export const ServiceList: FC<IServiceList> = ({ services }) => {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log([services]);
  }, []);

  return (
    <FlatList
      initialNumToRender={10}
      data={services}
      keyExtractor={({ id, price, description }) => `service-${id}`}
      renderItem={({ item }) => (
        <ServiceItem
          id={item.id}
          description={item.description}
          price={item.price}
        />
      )}
      bounces={false}
      collapsable={true}
      centerContent
    />
  );
};
