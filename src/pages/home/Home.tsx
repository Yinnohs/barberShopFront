import { View, ImageBackground } from 'react-native';
import { Layout } from '../layout';

export const Home = () => {
  return (
    <Layout>
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ImageBackground
          borderRadius={20}
          style={{
            width: '95%',
            height: '80%',
            marginLeft: 15,
          }}
          source={require('../../../assets/imgs/back.png')}
        />
      </View>
    </Layout>
  );
};
