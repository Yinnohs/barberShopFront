import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  Alert,
  View,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { BasicButton } from '../../components/Buttons';
import { BasicInput } from '../../components/inputs';
import { Loader } from '../../components/loader';
import { AuthContext, ThemeContext, IAuthData } from '../../context';
import { RouteStackSelection, RootStack } from '../../router';
import { appTheme } from '../../theme';
import { getuserInformation, updateUser } from '../../api/user.api';
import Icon from '@expo/vector-icons/MaterialIcons';
import { Layout } from '../layout';

const inputs = {
  name: '',
  surname: '',
  email: '',
};

export const Profile = () => {
  const { authData } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();
  const [formValues, setFormValues] = useState(inputs);

  const [errors, setErrors] = useState(inputs);
  const [isLoading, setIsLoading] = useState(false);

  const getUsetInformation = async () => {
    const data = await getuserInformation(authData.token);
    setFormValues(() => data);
  };

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
    return valid;
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  const handleUpdate = async () => {
    const isValidForm = validate();

    if (!isValidForm) {
      return;
    }

    setIsLoading(true);

    const data = await updateUser(formValues, authData.token);

    if (!data) {
      setIsLoading(false);
      return Alert.alert('something went wrong trying to registering');
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUsetInformation();
  }, []);

  return (
    <Layout>
      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
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
                flex: 0.8,
                // height: '10pt',
                // width: '95%',
                backgroundColor: appTheme[theme].colorSurface,
                ...appTheme[theme].shadowOne,
              },
              styles.center,
            ]}
          >
            <Icon
              name="person"
              style={[
                {
                  color: appTheme[theme].colorPrimary,
                  fontSize: 50,
                },
                appTheme[theme].shadowOne,
              ]}
            />
            <Text
              style={{
                fontSize: 40,
                color: appTheme[theme].colorPrimary,
                textAlign: 'center',
                marginVertical: 10,
              }}
            >
              Actualiza tu perfil
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
                action={() => handleUpdate()}
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
    </Layout>
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
