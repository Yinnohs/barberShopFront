import { FC, useContext, useState } from 'react';
import {
  TextInput,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
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
  iconName?: string;
  error?: string;
  onFocusFunction: Function;
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

export const BasicInput: FC<Props & TextInputProps> = ({
  action,
  type,
  labelString,
  value,
  max,
  min,
  variation,
  iconName,
  placeholder,
  error,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { theme } = useContext(ThemeContext);
  const InputVariation = defineVariation(variation);

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
        <Text
          style={{
            fontSize: 15,
            color: error
              ? appTheme.colorWarning
              : appTheme[theme].colorSecondary,
          }}
        >
          {labelString}
        </Text>

        <View
          style={{
            width: '100%',
            height: '80%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: appTheme[theme].colorInput,
            borderRadius: 5,
            borderWidth: isFocused ? 2 : 1,
            borderColor: error
              ? appTheme.colorWarning
              : isFocused
              ? appTheme[theme].colorPrimary
              : appTheme[theme].colorSurface,
          }}
        >
          <MaterialDesingIcons
            name={iconName as any}
            style={{
              fontSize: 30,
              color: appTheme[theme].colorPrimary,
              marginHorizontal: 10,
            }}
          />
          <TextInput
            style={[
              {
                width: '80%',
                height: '100%',
                fontSize: 20,
                paddingLeft: 10,
                color: appTheme[theme].colorPrimary,
                backgroundColor: 'none',
              },
            ]}
            value={value}
            onChangeText={(value) => validations(value)}
            keyboardType={type === 'number' ? 'number-pad' : 'default'}
            textContentType={InputVariation}
            secureTextEntry={
              variation === 'password' && !isVisible ? true : false
            }
            placeholder={placeholder}
            placeholderTextColor={appTheme[theme].colorSecondary}
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setIsFocused(false);
            }}
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
      {error && (
        <Text
          style={[{ color: appTheme.colorWarning, fontSize: 15, marginTop: 5 }]}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '13%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
