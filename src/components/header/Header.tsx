import { useContext } from 'react';
import { ThemeContext } from '../../context';
import { StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { appTheme } from '../../theme';
import { IconButton, ToggleButton } from '../Buttons';

export const Header = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigation();

  const handleBackwards = () => {
    if (navigate.canGoBack()) {
      navigate.goBack();
    }
  };
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: appTheme[theme].colorBackground },
      ]}
    >
      <View style={styles.containerChild}>
        <IconButton
          action={handleBackwards}
          bgColor={appTheme[theme].colorBackground}
          height={50}
          width={50}
          iconColor={appTheme[theme].colorPrimary}
          iconName="arrow-back-ios"
          rounded
          iconSize={30}
        />
        <ToggleButton />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerChild: {
    width: '90%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
});
