import { FC, useContext } from 'react';
import { ThemeContext } from '../../context';
import { Modal, StyleSheet, View, Text } from 'react-native';
import { appTheme } from '../../theme';
import { BasicButton } from '../Buttons';

interface IModal {
  deleteText: string;
  deleteAction: Function;
  isOpen: boolean;
  setIsOpen: Function;
}

export const DeleteModal: FC<IModal> = ({
  deleteText,
  deleteAction,
  setIsOpen,
  isOpen,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <Modal
      visible={isOpen}
      animationType="slide"
      transparent={true}
      style={[styles.container, styles.oneHundred, { position: 'relative' }]}
    >
      <View
        style={[
          styles.container,
          styles.modal,
          { backgroundColor: appTheme[theme].colorSurface, borderRadius: 5 },
          { position: 'absolute', top: 250, left: 37 },
        ]}
      >
        <Text style={[{ color: appTheme[theme].colorPrimary, fontSize: 20 }]}>
          {deleteText}
        </Text>
        <View style={[styles.half, styles.containerHorizontal]}>
          <BasicButton
            action={() => setIsOpen(false)}
            bgColor={appTheme[theme].colorPrimary}
            height="25%"
            width="45%"
            rounded={true}
            textColor={appTheme[theme].colorSurface}
            title="cancelar"
            type="filled"
            textSize={20}
          />

          <BasicButton
            action={() => deleteAction()}
            bgColor={appTheme[theme].colorSecondary}
            height="25%"
            width="45%"
            rounded={true}
            textColor={appTheme[theme].colorPrimary}
            title="aceptar"
            type="outline"
            textSize={20}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHorizontal: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  oneHundred: {
    width: '100%',
    height: '100%',
  },

  half: {
    width: '100%',
    height: '70%',
  },

  modal: { width: '80%', height: '40%' },
});
