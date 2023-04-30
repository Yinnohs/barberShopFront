import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native/types';

interface Props {
  children: ReactNode;
}

export const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return <View>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
