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
import { useContext, useEffect, useState } from 'react';
import { AuthContext, ThemeContext } from '../../../context';
import { BasicInput } from '../../../components/inputs';
import { BasicButton } from '../../../components/Buttons';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';
import {
  getuserInformationById,
  singUpBarber,
  updateBarber,
  updateUser,
} from '../../../api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../../components/loader/Loader';

const inputs = {
  name: '',
  surname: '',
  email: '',
  password: '',
};

export const AdminBarnberForm = () => {
  const route = useRoute<RouteProp<Record<string, any>, string>>();
  const id = route?.params?.id;
  const text = !id ? 'Registra un barbero' : 'Actualiza un barbero';
  const { authData } = useContext(AuthContext);
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

    if (!id) {
      if (!formValues.password) {
        handleErrorChange(
          'El campo contraseña no puede estár vacío',
          'password',
        );
        valid = false;
      }
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

    const data = await singUpBarber(formValues, authData.token);

    if (!data) {
      setIsLoading(false);
      return Alert.alert('Algo salió mal actualizando el Barbero');
    }
    setIsLoading(false);
    navigation.navigate('AdminBarber');
  };

  const handleUpdate = async () => {
    const isValidForm = validate();

    if (!isValidForm) {
      return;
    }

    setIsLoading(true);

    const payload = {
      name: formValues.name,
      surname: formValues.surname,
      email: formValues.email,
    };

    const data = await updateBarber(payload, authData.token, id);

    if (!data) {
      setIsLoading(false);
      return Alert.alert('something went wrong trying to registering');
    }

    setIsLoading(false);
  };

  const handleSend = () => {
    if (!id) {
      handleRegister();
    } else {
      handleUpdate();
    }
  };

  const getUsetInformation = async () => {
    const data = await getuserInformationById(authData.token, id);
    if (!data) {
      Alert.alert('Algo pasó al conseguir la información desde el servidor');
    }
    setFormValues(data);
  };

  useEffect(() => {
    if (id) {
      getUsetInformation();
    }
  }, []);

  return (
    <KeyboardAvoidingView
      onTouchStart={Keyboard.dismiss}
      behavior={Platform.OS === 'ios' ? 'height' : 'height'}
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
            {text}
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

          {!id ? (
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
          ) : (
            <></>
          )}

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
              action={handleSend}
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
