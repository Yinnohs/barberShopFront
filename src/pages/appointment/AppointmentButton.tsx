import { useContext } from 'react';
import { ThemeContext } from '../../context';
import { TouchableOpacity, Text } from 'react-native';
import { appTheme } from '../../theme';

interface IAppointmentButton {
  timeSlot: string;
  setTimeSlot: Function;
}

export const AppointmentButton = ({
  timeSlot,
  setTimeSlot,
}: IAppointmentButton) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity
      style={{
        height: '50%',
        width: 100,
        backgroundColor: appTheme[theme].colorSurface,
      }}
      onPress={() => setTimeSlot(timeSlot)}
    >
      <Text style={{ color: appTheme[theme].colorPrimary, fontSize: 20 }}>
        {timeSlot}
      </Text>
    </TouchableOpacity>
  );
};
