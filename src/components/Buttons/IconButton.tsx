import { FC } from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/MaterialIcons';
interface Props {
  action: Function;
  width: number | string;
  height: number | string;
  iconName: string;
  bgColor: string;
  iconColor: string;
  iconSize: number;
  rounded: boolean;
}

export const IconButton: FC<Props> = ({
  action,
  bgColor,
  height,
  iconName,
  width,
  iconColor,
  rounded,
  iconSize,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
          width,
          height,
          borderColor: bgColor,
          backgroundColor: bgColor,
          borderWidth: 2,
          borderRadius: rounded ? 50 : 0,
        },
      ]}
      onPress={() => action()}
    >
      <Icon
        name={iconName as any}
        style={{
          color: iconColor,
          fontSize: iconSize,
          textAlign: 'center',
        }}
      />
    </TouchableOpacity>
  );
};
