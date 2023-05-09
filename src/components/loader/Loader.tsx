import { FC, useContext } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  useWindowDimensions,
  Text,
} from 'react-native';
import { ThemeContext } from '../../context';
import { appTheme } from '../../theme';

interface LoaderProps {
  isVisible: boolean;
}

export const Loader: FC<LoaderProps> = ({ isVisible }) => {
  const { theme } = useContext(ThemeContext);
  const { width, height } = useWindowDimensions();
  return (
    <>
      {isVisible && (
        <View style={[style.container, { width, height }]}>
          <View
            style={[
              style.loader,
              { backgroundColor: appTheme[theme].colorBackground },
            ]}
          >
            <ActivityIndicator
              size={'large'}
              color={appTheme[theme].colorPrimary}
            />
            <Text style={{ fontSize: 20, color: appTheme[theme].colorPrimary }}>
              Cargando ...
            </Text>
          </View>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loader: {
    position: 'relative',
    height: 70,
    marginHorizontal: 50,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    top: '70%',
  },
});
