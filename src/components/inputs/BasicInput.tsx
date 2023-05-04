import { FC, useContext, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MaterialDesingIcons from '@expo/vector-icons/MaterialIcons';
import { ThemeContext, appTheme } from '../../theme';

type InputVariation = 'phone' | 'email' | 'password';

interface Props {
  labelString: string;
  type: 'text' | 'number';
  action: Function;
  value: string;
  variation?: InputVariation;
  max?: number;
  min?: number;
}

const defineVariation = (variation?: InputVariation) => {
  switch (variation) {
    case 'email':
      return 'emailAddress';

    case 'password':
      'password';

    case 'phone':
      return 'telephoneNumber';
  }
};

export const BasicInput: FC<Props> = ({
  action,
  type,
  labelString,
  value,
  max,
  min,
  variation,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const { theme } = useContext(ThemeContext);

  const validations = (value: string) => {
    switch (type) {
      case 'text':
        return action(value);
      case 'number':
        const numericalValue = parseFloat(value);
        if (
          !isNaN(numericalValue) ||
          numericalValue > min! ||
          numericalValue < max!
        ) {
          action(type);
        }
        break;
    }
  };

  return (
    <View style={[styles.container]}>
      <View>
        <Text style={{ fontSize: 20, color: appTheme[theme].colorPrimary }}>
          {labelString}
        </Text>
        <View
          style={{
            width: '100%',
            height: '70%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <TextInput
            style={{
              borderRadius: 30,
              borderWidth: 2,
              width: '80%',
              height: '100%',
              fontSize: 20,
              padding: 25,
              color: appTheme[theme].colorPrimary,
              borderColor: appTheme[theme].colorPrimary,
            }}
            value={value}
            onChangeText={(value) => validations(value)}
            keyboardType={type === 'number' ? 'number-pad' : 'default'}
            textContentType={defineVariation(variation)}
            secureTextEntry={
              variation === 'password' && !isVisible ? true : false
            }
            multiline={false}
          />
          {variation === 'password' ? (
            <TouchableOpacity
              style={{ position: 'absolute', right: 15 }}
              onPress={() => setIsVisible(!isVisible)}
            >
              <MaterialDesingIcons
                style={{ fontSize: 35, color: appTheme[theme].colorPrimary }}
                name={isVisible ? 'visibility' : 'visibility-off'}
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '15%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
