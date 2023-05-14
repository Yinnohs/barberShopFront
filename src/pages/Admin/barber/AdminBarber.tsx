import { View, Text, StyleSheet } from 'react-native';
import { appTheme } from '../../../theme';
import React, { useContext, useState } from 'react';
import { IBarber, ThemeContext } from '../../../context';
import { Layout } from '../../layout';
import { BasicButton } from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';
import { BarberList } from '../../../components/barbers';

export const AdminBarber = () => {
  const { theme } = useContext(ThemeContext);
  const [barber, setBarber] = useState<IBarber[]>([] as IBarber[]);
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
            Barberos
          </Text>
          <BasicButton
            action={() => navigation.navigate('AdminBarberForm')}
            bgColor={appTheme[theme].colorPrimary}
            rounded
            height={'35%'}
            textColor={appTheme[theme].colorPrimary}
            title="Añadir Barbero + 1"
            textSize={20}
            type="outline"
            width={'70%'}
          />
        </View>
        {/*TODO: create a list of current barbers in the app*/}
        <View style={[{ width: '80%', alignItems: 'center' }]}>
          <BarberList barbers={barber!} />
        </View>
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
