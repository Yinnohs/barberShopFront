import { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext, appTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { AuthRouteType, RootStack } from '../../router';

export const Auth = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigation = useNavigation<AuthRouteType>();

  useEffect(() => {});

  return (
    <View style={[styles.container, styles.center, styles.darkBg]}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
        style={[styles.button, styles.center, styles.buttonOutline]}
      >
        <Text> Cambiar Tema </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  darkBg: {
    backgroundColor: appTheme.dark.colorBackground,
  },
  lightBg: {
    backgroundColor: appTheme.light.colorBackground,
  },

  button: {
    width: '40%',
    height: '8%',
    borderRadius: 20,
  },

  buttonOutline: {
    color: appTheme.light.colorPrimary,
    backgroundColor: appTheme.light.colorSurface,
  },

  buttonFilled: {},
});
