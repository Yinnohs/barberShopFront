import { FC, useEffect } from 'react';
import { IService } from '../../context/services/ServicesContext';
import { FlatList } from 'react-native';
import { ServiceItem } from './ServiceItem';

interface IServiceList {
  services: IService[];
  openCloseModal: Function;
  setIdToDelete: Function;
}

export const ServiceList: FC<IServiceList> = ({
  services,
  openCloseModal,
  setIdToDelete,
}) => {
  const openFunction = async (id: number) => {
    openCloseModal(true);
    setIdToDelete(id);
  };

  useEffect(() => {}, []);

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 100 }}
      data={services}
      keyExtractor={({ id }) => `service-${id}`}
      renderItem={({ item }) => (
        <ServiceItem
          openModalFunction={() => openFunction(item.id)}
          id={item.id}
          description={item.description}
          price={item.price}
        />
      )}
      collapsable={true}
      progressViewOffset={20}
    />
  );
};
