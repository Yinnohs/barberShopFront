import { StyleSheet, View, Text } from 'react-native';
import { Layout } from '../layout';
import { BasicButton } from '../../components/Buttons';
import { useContext, useEffect } from 'react';
import { AuthContext, ThemeContext } from '../../context';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../router';
import { appTheme } from '../../theme';

export const Admin = () => {
  const { theme } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();

  useEffect(() => {
    // if (authData.role !== 'ADMIN') {
    //   navigation.navigate('Home');
    // }
  }, []);

  return (
    <Layout>
      <View style={[styles.container]}>
        <View
          style={[
            styles.childContainer,
            {
              width: '70%',
              height: '30%',
              marginBottom: 30,
              justifyContent: 'center',
              backgroundColor: appTheme[theme].colorSurface,
              borderRadius: 20,
            },
            appTheme[theme].shadowOne,
          ]}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: appTheme[theme].colorPrimary,
            }}
          >
            Bienvenido
          </Text>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 30,
              color: appTheme[theme].colorPrimary,
            }}
          >
            Administrador
          </Text>
        </View>

        <View
          style={[styles.childContainer, { justifyContent: 'space-evenly' }]}
        >
          <BasicButton
            action={() => navigation.navigate('AdminBarber')}
            bgColor={appTheme[theme].colorPrimary}
            rounded
            height={'35%'}
            textColor={appTheme[theme].colorSurface}
            title="Administrar Barberos"
            textSize={20}
            type="filled"
            width={'70%'}
          />

          <BasicButton
            action={() => navigation.navigate('AdminServices')}
            bgColor={appTheme[theme].colorPrimary}
            rounded
            height={'35%'}
            textColor={appTheme[theme].colorPrimary}
            title="Administrar servicios"
            textSize={20}
            type="outline"
            width={'70%'}
          />
        </View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  childContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
