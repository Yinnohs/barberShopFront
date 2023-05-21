import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { appTheme } from '../../../theme';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext, IBarber, ThemeContext } from '../../../context';
import { Layout } from '../../layout';
import { BasicButton } from '../../../components/Buttons';
import { useNavigation } from '@react-navigation/native';
import { RouteStackSelection, RootStack } from '../../../router';
import { BarberList } from '../../../components/barbers';
import { delegateToClient, getAllUsersBarbers } from '../../../api/user.api';
import { DeleteModal } from '../../../components/modals';

export const AdminBarber = () => {
  const { theme } = useContext(ThemeContext);
  const { authData } = useContext(AuthContext);
  const [barbers, setBarbers] = useState<IBarber[]>([] as IBarber[]);
  const navigation = useNavigation<RouteStackSelection<RootStack>>();
  const [isOpen, setIsOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState(0);

  const fetchBarbers = async () => {
    const fetchedBarbers = await getAllUsersBarbers(authData.token);
    setBarbers(fetchedBarbers);
  };

  const deleteFunction = async () => {
    await delegateToClient(idToDelete, authData.token);
    await fetchBarbers();
    setIdToDelete(0);
    setIsOpen(false);
  };

  useEffect(() => {
    fetchBarbers();
  }, []);

  return (
    <Layout>
      <SafeAreaView style={[styles.container]}>
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
        <View style={[{ width: '80%', alignItems: 'center' }]}>
          <BarberList
            barbers={barbers!}
            openCloseModal={setIsOpen}
            setIdToDelete={setIdToDelete}
          />
        </View>
        <DeleteModal
          deleteAction={deleteFunction}
          isOpen={isOpen}
          deleteText={`¿Estás seguro de convertir este barbero a cliente?`}
          setIsOpen={setIsOpen}
        />
      </SafeAreaView>
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
