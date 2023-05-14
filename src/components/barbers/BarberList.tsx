import { FC, useContext, useEffect } from 'react';
import { IBarber, ThemeContext } from '../../context';
import { FlatList } from 'react-native';
import { BarberItem } from './BarberItem';

interface IBarberList {
  barbers: IBarber[];
}

export const BarberList: FC<IBarberList> = ({ barbers }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <FlatList
      initialNumToRender={10}
      data={barbers}
      keyExtractor={({ id }) => `service-${id}`}
      renderItem={({ item }) => (
        <BarberItem
          id={item.id}
          name={item.name}
          surname={item.surname}
          email={item.email}
        />
      )}
      bounces={false}
      collapsable={true}
      centerContent
    />
  );
};
