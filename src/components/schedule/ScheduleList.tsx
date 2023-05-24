import { FC, useEffect } from 'react';
import { FlatList } from 'react-native';
import { ScheduleItem } from './ScheduleItem';

interface IScheduleList {
  schedules: any[];
  openCloseModal: Function;
  setIdToDelete: Function;
}

export const ScheduleList: FC<IScheduleList> = ({
  schedules,
  openCloseModal,
  setIdToDelete,
}) => {
  const openFunction = async (id: number) => {
    openCloseModal(true);
    setIdToDelete(id);
  };

  return (
    <FlatList
      contentContainerStyle={{ alignItems: 'center' }}
      data={schedules}
      keyExtractor={(data: any) => `service-${data?.id}`}
      renderItem={({ item }) => (
        <ScheduleItem
          openModalFunction={() => openFunction(item.id)}
          services={item.service}
          name={item?.barber?.name}
          surname={item?.barber?.surname}
          scheduledDateTime={item?.scheduledDateTime}
          scheduleId={item?.id}
        />
      )}
      bounces={false}
      collapsable={true}
      progressViewOffset={20}
    />
  );
};
