import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialDesingIcons from '@expo/vector-icons/MaterialIcons';
import {
  RootStack,
  RootStackRoutingString,
  RouteStackSelection,
} from '../../../router';
import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import { appTheme } from '../../../theme';

interface Props {
  page: RootStackRoutingString;
  title?: string;
  iconName: string;
  iconColor: string;
}

export const NavButton: FC<Props> = ({ page, title, iconName, iconColor }) => {
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  return (
    <>
      <TouchableOpacity
        style={[styles.button, appTheme.dark.shadowOne]}
        onPress={() => navigation.navigate(page)}
      >
        {title ?? <Text>{title}</Text>}
        <MaterialDesingIcons
          name={iconName as any}
          style={{
            height: '100%',
            width: '100%',
            fontSize: 40,
            color: iconColor,
          }}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '80%',
    width: '15%',
    borderRadius: 40,
    borderColor: '#000',
  },
});
