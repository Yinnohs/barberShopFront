import { StyleSheet, View } from 'react-native';
import { appTheme } from '../../theme';
import { useTheme } from '@react-navigation/native';
import { useContext } from 'react';
import { ThemeContext } from '../../theme';

export const Register = () => {
  const { theme } = useContext(ThemeContext);
  return <View style={[styles.container]}></View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
