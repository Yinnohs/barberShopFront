import { ReactNode, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { NavBar } from '../../components/nav';
import { ThemeContext } from '../../context';

interface Props {
  children: ReactNode;
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={[styles.container]}>
      {children}
      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
});
