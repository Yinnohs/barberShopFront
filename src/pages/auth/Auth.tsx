import { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext, appTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';
import { BasicButton } from '../../components/Buttons';

export const Auth = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  useEffect(() => {});

  return (
    <View style={[styles.container, styles.center, styles.darkBg]}>
      <BasicButton
        action={() => navigation.navigate('Register')}
        bgColor={appTheme[theme!].colorPrimary}
        height="8%"
        width="40%"
        rounded={true}
        textColor="#FFF"
        title="Registrate"
        type="filled"
        textSize={20}
      />

      <BasicButton
        action={() => navigation.navigate('Login')}
        bgColor={appTheme[theme!].colorPrimary}
        height="8%"
        width="40%"
        rounded={true}
        textColor="#000"
        title="Logueate"
        type="outline"
        textSize={20}
      />
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
    alignItems: 'center',
    justifyContent: 'center',
  },

  darkBg: {
    backgroundColor: appTheme.dark.colorBackground,
  },
  lightBg: {
    backgroundColor: appTheme.light.colorBackground,
  },
});
