import { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';

interface Props {
  action: Function;
  width: number;
  height: number;
  type: 'outline' | 'filled';
  title: string;
  bgColor: string;
  textColor: string;
  rounded: boolean;
}

export const BasicButton: FC<Props> = ({
  action,
  bgColor,
  height,
  title,
  type,
  width,
  textColor,
  rounded,
}) => {
  return (
    <TouchableOpacity
      style={{
        width,
        height,
        borderColor: bgColor,
        backgroundColor: type === 'outline' ? 'none' : bgColor,
        borderRadius: rounded ? 20 : 0,
      }}
      onPress={() => action()}
    >
      <Text
        style={{
          color: textColor,
          width: '50%',
          height: '50%',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
