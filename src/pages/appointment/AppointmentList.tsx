import { FC } from 'react';
import { AppointmentButton } from './AppointmentButton';
import { FlatList } from 'react-native';

interface ITimeSlotList {
  timeslots: string[];
  setTimeSlot: Function;
}

export const BarberList: FC<ITimeSlotList> = ({ timeslots, setTimeSlot }) => {
  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 100 }}
      initialNumToRender={10}
      data={timeslots}
      keyExtractor={(timeslot) => `TS${timeslot}`}
      renderItem={({ item }) => (
        <AppointmentButton setTimeSlot={setTimeSlot} timeSlot={item} />
      )}
      collapsable={true}
      centerContent
    />
  );
};
