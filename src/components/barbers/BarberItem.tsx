import { FC, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { IBarber, ThemeContext } from '../../context';
import { appTheme } from '../../theme';
import Icon from '@expo/vector-icons/MaterialIcons';

interface IItem {
  openModalFunction: Function;
}

export const BarberItem: FC<IBarber & IItem> = ({
  email,
  openModalFunction,
}) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View
      style={[
        styles.item,
        { backgroundColor: appTheme[theme].colorSurface },
        appTheme[theme].shadowOne,
      ]}
    >
      <TouchableOpacity
        onPress={() => {}}
        style={[
          {
            width: '75%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
          },
        ]}
      >
        <Text
          style={(styles.textSize, { color: appTheme[theme].colorPrimary })}
        >
          {email}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => openModalFunction()}
        style={[
          {
            alignItems: 'center',
            justifyContent: 'center',
            width: '25%',
            height: '100%',
          },
        ]}
      >
        <Icon
          style={{
            color: appTheme.colorWarning,
            textAlign: 'center',
            fontSize: 40,
          }}
          name="delete"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    borderRadius: 20,
  },
  textSize: {
    fontSize: 20,
  },
});
