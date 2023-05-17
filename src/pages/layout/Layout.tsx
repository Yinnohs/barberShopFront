import { ReactNode, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavBar } from '../../components/nav';
import { ThemeContext } from '../../context';
import { appTheme } from '../../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../components/header';

interface Props {
  children: ReactNode;
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: appTheme[theme].colorBackground },
      ]}
    >
      {children}
      <NavBar />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    justifyContent: 'center',
  },
});
