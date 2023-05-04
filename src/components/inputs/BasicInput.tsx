import { FC } from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

interface Props {
  labelString: string;
  type: 'text' | 'number';
  action: Function;
  value: string;
  variation?: 'phone' | 'email';
  max?: number;
  min?: number;
}

export const BasicInput: FC<Props> = ({
  action,
  type,
  labelString,
  value,
  max,
  min,
  variation,
}) => {
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
      <Text>{labelString}</Text>
      <TextInput
        value={value}
        onChangeText={(value) => validations(value)}
        keyboardType={type === 'number' ? 'number-pad' : 'default'}
        textContentType={
          variation === 'email' ? 'emailAddress' : 'telephoneNumber'
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '10%',
    width: '90%',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 5,
  },
});
