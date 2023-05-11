import { StyleSheet, View } from 'react-native';
import { appTheme } from '../../theme';
import React, { useContext } from 'react';
import { NavButton } from './components';
import { AuthContext, ThemeContext } from '../../context';

export const NavBar = () => {
  const { authData } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.container, appTheme[theme].shadowOne]}>
      <NavButton
        iconName="home"
        page="Home"
        iconColor={appTheme[theme].colorPrimary}
      />
      {authData.role === 'ADMIN' ? (
        <NavButton
          iconName="person"
          page="AdminHome"
          iconColor={appTheme[theme].colorPrimary}
        />
      ) : (
        <></>
      )}
      <NavButton
        iconName="calendar-today"
        page="AppointmentFirst"
        iconColor={appTheme[theme].colorPrimary}
      />
      <NavButton
        iconName="book"
        page="AppointmentFirst"
        iconColor={appTheme[theme].colorPrimary}
      />
      <NavButton
        iconName="settings"
        page="Profile"
        iconColor={appTheme[theme].colorPrimary}
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
    justifyContent: 'space-around',
    alignItems: 'center',
    gap: 5,
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: appTheme.light.colorBackground,
  },
});
