import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import { appTheme } from '../../theme';
import { AppointmentContext, ThemeContext } from '../../context';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { BasicButton } from '../Buttons';

export const DatePickerCustom = () => {
  const { theme } = useContext(ThemeContext);
  const { appointment, setAppointment } = useContext(AppointmentContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDatePick = (value: Date) => {
    setDate(value);
  };

  return (
    <SafeAreaView>
      <BasicButton
        action={() => handleOpen()}
        bgColor={appTheme[theme].colorSecondary}
        height={60}
        width={150}
        rounded={true}
        textColor={appTheme[theme].colorPrimary}
        title="Cancelar"
        type="outline"
        textSize={20}
      />
      <DateTimePickerModal
        isVisible={isOpen}
        mode="date"
        onConfirm={handleDatePick}
        onCancel={handleClose}
        date={date}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    width: '90%',
    padding: 35,
    alignItems: 'center',
    elevation: 5,
  },
});
