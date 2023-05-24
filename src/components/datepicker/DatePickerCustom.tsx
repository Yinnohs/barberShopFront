import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import React, { useContext, useState } from 'react';
import { appTheme } from '../../theme';
import { ThemeContext } from '../../context';
export const DatePickerCustom = () => {
  const { theme } = useContext(ThemeContext);
  const [open, setOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | null>();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDatePick = (value: Date) => {
    setDate(value);
  };

  return (
    <SafeAreaView>
      <TouchableOpacity>
        <Text> Open </Text>
      </TouchableOpacity>

      <Modal>
        <View style={styles.centeredView}>
          <View
            style={[
              styles.modalView,
              appTheme[theme].shadowOne,
              { backgroundColor: appTheme[theme].colorBackground },
            ]}
          ></View>
        </View>
      </Modal>
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
