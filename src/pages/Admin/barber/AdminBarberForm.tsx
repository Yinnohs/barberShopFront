import {
  Keyboard,
  StyleSheet,
  Text,
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { appTheme } from '../../../theme';
import { useContext, useState } from 'react';
import { AuthContext, IAuthData, ThemeContext } from '../../../context';
import { BasicInput } from '../../../components/inputs';
import { BasicButton } from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';
import { singUpUser } from '../../../api';
import {
  saveAccessToken,
  saveRefreshToken,
} from '../../../localStorage/localStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../../components/loader/Loader';

const inputs = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

export const AdminBarnberForm = () => {
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

    if (!formValues.name) {
      handleErrorChange('El campo nombres no puede estár vacío', 'name');
      valid = false;
    }

    if (!formValues.surname) {
      handleErrorChange('El campo apellidos no puede estár vacío', 'surname');
      valid = false;
    }

    if (!formValues.password) {
      handleErrorChange('El campo contraseña no puede estár vacío', 'password');
      valid = false;
    }

    return valid;
  };

  const handleCancel = () => {
    navigation.navigate('AdminBarber');
  };

  const handleRegister = async () => {
    const isValidForm = validate();

    if (!isValidForm) {
      return;
    }

    setIsLoading(true);

    const data = await singUpUser(formValues);

    if (!data) {
      setIsLoading(false);
      return Alert.alert('something went wrong trying to registering');
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
      onTouchStart={Keyboard.dismiss}
      behavior={Platform.OS === 'ios' ? 'height' : 'padding'}
      style={[
        styles.container,
        { backgroundColor: appTheme[theme].colorBackground },
      ]}
    >
      <SafeAreaView
        style={[
          styles.container,
          styles.center,
          { backgroundColor: appTheme[theme].colorBackground },
        ]}
      >
        <View
          style={[
            {
              height: '100%',
              width: '95%',
              backgroundColor: appTheme[theme].colorSurface,
              ...appTheme[theme].shadowOne,
            },
          ]}
        >
          <Text
            style={{
              fontSize: 40,
              color: appTheme[theme].colorPrimary,
              textAlign: 'center',
              marginVertical: 5,
            }}
          >
            Registra un barbero
          </Text>
          <BasicInput
            action={(value: string) => {
              handleInputChange(value, 'name');
            }}
            value={formValues.name}
            labelString="Nombres"
            type="text"
            iconName="person"
            placeholder="Nombre"
            error={errors.name}
            onFocusFunction={() => {
              handleErrorChange('', 'name');
            }}
            marginVertical={10}
            heigth={'10%'}
          />

          <BasicInput
            action={(value: string) => {
              handleInputChange(value, 'surname');
            }}
            value={formValues.surname}
            labelString="Apellidos"
            type="text"
            iconName="person-outline"
            placeholder="Apellidos"
            error={errors.surname}
            onFocusFunction={() => {
              handleErrorChange('', 'surname');
            }}
            marginVertical={10}
            heigth={'10%'}
          />

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
            marginVertical={10}
            heigth={'10%'}
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
            placeholder="Contraseña"
            error={errors.password}
            onFocusFunction={() => {
              handleErrorChange('', 'password');
            }}
            marginVertical={10}
            heigth={'10%'}
          />

          <View
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 50,
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
              action={() => console.log('TODO::')}
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
        </View>
      </SafeAreaView>
      <Loader isVisible={isLoading} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  childCenter: {
    isplay: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
