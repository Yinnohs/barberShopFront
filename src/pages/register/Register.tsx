import { Keyboard, StyleSheet, View, Text } from 'react-native';
import { appTheme } from '../../theme';
import { useContext, useState } from 'react';
import { ThemeContext } from '../../theme';
import { BasicInput } from '../../components/inputs';

export const Register = () => {
  const { theme } = useContext(ThemeContext);

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [surname, setSurname] = useState('');

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
          { width: '100%', height: '10%', marginTop: 100 },
        ]}
      >
        <Text style={{ fontSize: 40, color: appTheme[theme].colorPrimary }}>
          Registrate
        </Text>
      </View>

      <View
        style={[
          styles.childCenter,
          {
            height: '70%',
            width: '100%',
            backgroundColor: appTheme[theme].colorSurface,
            borderRadius: 40,
            position: 'absolute',
            bottom: 0,
          },
        ]}
      >
        <BasicInput
          action={setName}
          value={name}
          labelString="Nombres"
          type="text"
        />

        <BasicInput
          action={setSurname}
          value={surname}
          labelString="Apellidos"
          type="text"
        />

        <BasicInput
          action={setEmail}
          value={email}
          labelString="Email"
          variation="email"
          type="text"
        />

        <BasicInput
          action={setPassword}
          value={password}
          labelString="Contaseña"
          variation="password"
          type="text"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    isplay: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  childCenter: {
    isplay: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
