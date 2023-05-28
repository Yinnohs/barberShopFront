import moment from 'moment';

export const getTimeSlotArray = (today: string) => {
  const dates = [];
  const startDate = moment(today).startOf('day');
  startDate.set('hours', 8);
  startDate.set('minute', 0);
  startDate.set('seconds', 0);
  startDate.set('millisecond', 0);
  const hourDivider = 2;
  let hoursOfDay = hourDivider * 13;

  while (hoursOfDay--) {
    dates.push(startDate.toISOString());
    startDate.add(60 / hourDivider, 'minute');
  }

  return dates;
};

export const transformToFormatHours = (date: string) => {
  return moment(date).format('hh:mm a');
};

export const transformToFormatDays = (date: string) => {
  return moment(date).format('DD/MM/YYYY');
};

export const filterTimeSlots = (
  timeSlots: string[],
  takenTimeSlots: string[],
) => {
  const result: string[] = [];

  for (let timeSlot of timeSlots) {
    if (!takenTimeSlots.includes(timeSlot)) {
      result.push(timeSlot);
    }
  }

  return result;
};

export const getWeekDaySlots = (today: string) => {
  console.log({ today });
  const days = Array.apply(null, Array(7)).map((_, i) => {
    let value;
    if (i === 0) {
      value = moment(today).add(4, 'day').isoWeekday(i).toISOString();
    } else {
      value = moment(today).add(i, 'day').isoWeekday(i).toISOString();
    }
    console.log(value);
    return value;
  });
  return days;
};
