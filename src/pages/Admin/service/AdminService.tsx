import { View, Text, StyleSheet } from 'react-native';
import { appTheme } from '../../../theme';
import { useContext } from 'react';
import { ThemeContext } from '../../../context';
import { Layout } from '../../layout';
import { BasicButton } from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';

export const AdminService = () => {
  const { theme } = useContext(ThemeContext);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();
  return (
    <Layout>
      <View style={[styles.container]}>
        <View
          style={[styles.childContainer, { justifyContent: 'space-evenly' }]}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: 'center',
              color: appTheme[theme].colorPrimary,
            }}
          >
            Servicios
          </Text>
          <BasicButton
            action={() => navigation.navigate('AdminServiceForm')}
            bgColor={appTheme[theme].colorPrimary}
            rounded
            height={'35%'}
            textColor={appTheme[theme].colorPrimary}
            title="Crear un nuevo Servicio + 1"
            textSize={20}
            type="outline"
            width={'70%'}
          />
        </View>
        {/*TODO: create a list of current barbers in the app*/}
        <View></View>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  childContainer: {
    height: '30%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
});
