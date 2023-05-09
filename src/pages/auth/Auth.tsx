import { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ThemeContext, appTheme } from '../../theme';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';
import { BasicButton } from '../../components/Buttons';

export const Auth = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  useEffect(() => {});

  return (
    <View
      style={[
        styles.container,
        styles.center,
        { backgroundColor: appTheme[theme].colorBackground },
      ]}
    >
      <View
        style={[
          styles.center,
          appTheme[theme].shadowThree,
          ,
          { width: '100%', height: '30%' },
        ]}
      >
        <Image
          style={{
            width: '90%',
            height: '90%',
            borderRadius: 50,
            marginVertical: 100,
          }}
          source={require('../../../assets/imgs/barber-logo-design.png')}
        />
      </View>
      <View
        style={[
          styles.halfContainer,
          {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            marginTop: 50,
          },
        ]}
      >
        <Text style={[styles.font, { color: appTheme[theme].colorPrimary }]}>
          Bienvenido a nuestra Barberia
        </Text>
        <Text
          style={[styles.fontSecond, { color: appTheme[theme].colorPrimary }]}
        >
          Accede a la aplicación
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '80%',
            height: '50%',
          }}
        >
          <BasicButton
            action={() => navigation.navigate('Register')}
            bgColor={appTheme[theme].colorPrimary}
            height="30%"
            width="40%"
            rounded={true}
            textColor={appTheme[theme].colorSurface}
            title="Registrate"
            type="filled"
            textSize={20}
          />

          <BasicButton
            action={() => navigation.navigate('Login')}
            bgColor={appTheme[theme].colorSecondary}
            height="30%"
            width="40%"
            rounded={true}
            textColor={appTheme[theme].colorPrimary}
            title="Logueate"
            type="outline"
            textSize={20}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  halfContainer: {
    width: '100%',
    height: '50%',
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  font: {
    fontSize: 30,
  },

  fontSecond: {
    fontSize: 20,
  },
});
