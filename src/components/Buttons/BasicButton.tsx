import { FC, useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { ThemeContext, appTheme } from '../../theme';

interface Props {
  action: Function;
  width: number | string;
  height: number | string;
  type: 'outline' | 'filled';
  title: string;
  bgColor: string;
  textColor: string;
  textSize: number;
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
  textSize,
}) => {
  const { theme } = useContext(ThemeContext);
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
          backgroundColor: type === 'outline' ? 'none' : bgColor,
          borderWidth: 2,
          borderRadius: rounded ? 20 : 0,
        },
      ]}
      onPress={() => action()}
    >
      <Text
        style={{
          color: textColor,
          fontSize: textSize,
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
