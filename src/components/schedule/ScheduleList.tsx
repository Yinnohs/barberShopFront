import { FC } from 'react';
import { FlatList } from 'react-native';
import { ScheduleItem } from './ScheduleItem';

interface IScheduleList {
  schedules: any[];
}

export const ScheduleList: FC<IScheduleList> = ({ schedules }) => {
  return (
    <FlatList
      contentContainerStyle={{ alignItems: 'center', paddingBottom: 100 }}
      data={schedules}
      keyExtractor={(data: any) => `service-${data?.id}`}
      renderItem={({ item }) => (
        <ScheduleItem
          services={item.service}
          name={item?.barber?.name}
          surname={item?.barber?.surname}
          scheduledDateTime={item?.scheduledDateTime}
          scheduleId={item?.id}
        />
      )}
      collapsable={true}
      progressViewOffset={20}
    />
  );
};
