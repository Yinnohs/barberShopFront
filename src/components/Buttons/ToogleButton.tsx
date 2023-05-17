import { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { appTheme } from '../../theme';
import { ThemeContext } from '../../context';

export const ToggleButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const handleChange = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  return (
    <TouchableOpacity
      onPress={() => handleChange()}
      style={[
        styles.button,
        { backgroundColor: appTheme[theme].colorBackground },
      ]}
    >
      <Icon
        style={{
          color: appTheme[theme].colorPrimary,
          fontSize: 30,
          textAlign: 'center',
        }}
        name={theme === 'light' ? 'weather-sunny' : 'moon-waning-crescent'}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
