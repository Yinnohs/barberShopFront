import { StyleSheet, View } from 'react-native';
import { appTheme } from '../../theme';
import React from 'react';
import { NavButton } from './components';

export const NavBar = () => {
  return (
    <View style={[styles.container, appTheme.light.shadowTwo]}>
      <NavButton
        iconName="home"
        page="Home"
        iconColor={appTheme.light.colorSurface}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: appTheme.light.colorBackground,
  },
});
