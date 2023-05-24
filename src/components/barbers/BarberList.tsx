import { FC, useContext, useEffect } from 'react';
import { IBarber, ThemeContext } from '../../context';
import { FlatList } from 'react-native';
import { BarberItem } from './BarberItem';

interface IBarberList {
  barbers: IBarber[];
  openCloseModal: Function;
  setIdToDelete: Function;
}

export const BarberList: FC<IBarberList> = ({
  barbers,
  openCloseModal,
  setIdToDelete,
}) => {
  const openFunction = async (id: number) => {
    openCloseModal(true);
    setIdToDelete(id);
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 100 }}
      initialNumToRender={10}
      data={barbers}
      keyExtractor={({ id }) => `service-${id}`}
      renderItem={({ item }) => (
        <BarberItem
          id={item.id}
          name={item.name}
          surname={item.surname}
          email={item.email}
          openModalFunction={() => openFunction(item.id)}
        />
      )}
      collapsable={true}
      centerContent
    />
  );
};
