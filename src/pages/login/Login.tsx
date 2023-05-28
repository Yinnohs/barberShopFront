import {
  Keyboard,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { appTheme } from '../../theme';
import { useContext, useState } from 'react';
import { AuthContext, IAuthData, ThemeContext } from '../../context';
import { BasicInput } from '../../components/inputs';
import { BasicButton } from '../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';
import { signInUser, singUpUser } from '../../api';
import {
  saveAccessToken,
  saveRefreshToken,
} from '../../localStorage/localStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../components/loader/Loader';

const inputs = {
  email: '',
  password: '',
};

export const Login = () => {
  const { setAuthData } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();
  const [formValues, setFormValues] = useState(inputs);

  const [errors, setErrors] = useState(inputs);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value: string, input: keyof typeof inputs) => {
    setFormValues((prevState) => {
      return { ...prevState, [input]: value };
    });
  };

  const handleErrorChange = (value: string, input: keyof typeof inputs) => {
    setErrors((prevState) => {
      return { ...prevState, [input]: value };
    });
  };

  const validate = () => {
    Keyboard.dismiss;
    let valid = true;
    if (!formValues.email) {
      handleErrorChange('El campo email no puede estár vacío', 'email');
      valid = false;
    }

    if (!formValues.password) {
      handleErrorChange('El campo contraseña no puede estár vacío', 'password');
      valid = false;
    }

    return valid;
  };

  const handleCancel = () => {
    navigation.navigate('Auth');
  };

  const handleLogin = async () => {
    const isValidForm = validate();

    if (!isValidForm) {
      return;
    }

    setIsLoading(true);

    const data = await signInUser(formValues);

    if (!data) {
      setIsLoading(false);
      return Alert.alert('Usuario o contraseña incorrectos');
    }

    await saveAccessToken(data?.access_token);
    await saveRefreshToken(data?.refresh_token);
    const authData: IAuthData = {
      isLogged: true,
      role: data?.role,
      rToken: data?.refresh_token,
      token: data?.access_token,
    };
    setAuthData(authData);
    setIsLoading(false);
    navigation.navigate('Home');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
      style={[
        styles.container,
        { backgroundColor: appTheme[theme].colorBackground },
      ]}
    >
      <SafeAreaView
        onTouchStart={Keyboard.dismiss}
        style={[
          styles.container,
          styles.center,
          { backgroundColor: appTheme[theme].colorBackground },
        ]}
      >
        <Loader isVisible={isLoading} />
        <View
          style={[
            styles.center,
            { width: '100%', height: '10%', marginTop: 50 },
          ]}
        >
          <Text style={{ fontSize: 40, color: appTheme[theme].colorPrimary }}>
            ¡Inicia Sessión!
          </Text>
          <Text
            style={{
              fontSize: 20,
              color: appTheme[theme].colorSecondary,
              marginTop: 5,
            }}
          >
            Por favor añade la información necesaria
          </Text>
        </View>

        <ScrollView
          contentContainerStyle={[
            styles.childCenter,
            { width: '100%', height: '100%' },
          ]}
          style={[
            {
              height: '70%',
              width: '100%',
              backgroundColor: appTheme[theme].colorSurface,
              position: 'absolute',
              bottom: 0,
              ...appTheme[theme].shadowOne,
            },
          ]}
        >
          <View
            style={[
              { width: '100%', height: '50%', justifyContent: 'space-evenly' },
            ]}
          >
            <BasicInput
              action={(value: string) => {
                handleInputChange(value, 'email');
              }}
              value={formValues.email}
              labelString="Email"
              variation="email"
              type="text"
              iconName="mail-outline"
              placeholder="Ejemplo: a@a.com"
              error={errors.email}
              onFocusFunction={() => {
                handleErrorChange('', 'email');
              }}
              heigth={'25%'}
            />

            <BasicInput
              action={(value: string) => {
                handleInputChange(value, 'password');
              }}
              value={formValues.password}
              labelString="Contraseña"
              variation="password"
              type="text"
              iconName="lock-outline"
              placeholder="Agrega tu contraseña Aquí"
              error={errors.password}
              onFocusFunction={() => {
                handleErrorChange('', 'password');
              }}
              heigth={'25%'}
            />
          </View>

          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
            }}
          >
            <BasicButton
              action={() => handleCancel()}
              bgColor={appTheme[theme].colorSecondary}
              height={60}
              width={150}
              rounded={true}
              textColor={appTheme[theme].colorPrimary}
              title="Cancelar"
              type="outline"
              textSize={20}
            />

            <BasicButton
              action={() => handleLogin()}
              bgColor={appTheme[theme].colorPrimary}
              height={60}
              width={150}
              rounded={true}
              textColor={appTheme[theme].colorSurface}
              title="Enviar"
              type="filled"
              textSize={20}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
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
