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
import { AuthContext, ThemeContext } from '../../../context';
import { BasicInput } from '../../../components/inputs';
import { BasicButton } from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Loader } from '../../../components/loader/Loader';
import { createService } from '../../../api/service';

const inputs = {
  description: '',
  price: '',
  isActive: true,
};

export const AdminServiceForm = () => {
  const { setAuthData, authData } = useContext(AuthContext);
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
    if (!formValues.description) {
      handleErrorChange('El campo email no puede estár vacío', 'description');
      valid = false;
    }

    if (!formValues.price) {
      handleErrorChange('El campo nombres no puede estár vacío', 'price');
      valid = false;
    }
    return valid;
  };

  const handleCancel = () => {
    navigation.navigate('AdminServices');
  };

  const handleCreation = async () => {
    const isValidForm = validate();

    if (!isValidForm) {
      return;
    }

    setIsLoading(true);

    const createServiceData = {
      ...formValues,
      price: parseFloat(formValues.price),
    };

    const data = await createService(createServiceData, authData.token);

    if (!data) {
      setIsLoading(false);
      return Alert.alert('Algo malo ocurrió al crear el servicio');
    }

    setIsLoading(false);
    navigation.navigate('AdminServices');
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
              borderRadius: 40,
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
            Crea un nuevo servicio
          </Text>
          <BasicInput
            action={(value: string) => {
              handleInputChange(value, 'description');
            }}
            value={formValues.description}
            labelString="Descripcion"
            type="text"
            iconName="short-text"
            placeholder="Descripcion del servicio"
            error={errors.description}
            onFocusFunction={() => {
              handleErrorChange('', 'description');
            }}
            marginVertical={10}
            heigth={'10%'}
          />

          <BasicInput
            action={(value: string) => {
              handleInputChange(value, 'price');
            }}
            value={formValues.price}
            labelString="Precio"
            type="number"
            iconName="attach-money"
            placeholder="Precio"
            error={errors.price}
            onFocusFunction={() => {
              handleErrorChange('', 'price');
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
              action={() => handleCreation()}
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
