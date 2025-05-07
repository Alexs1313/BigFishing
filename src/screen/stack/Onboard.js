import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import GradientText from '../../components/GradientText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useStore} from '../../store/context';

const Onboard = () => {
  const navigation = useNavigation();
  const {userData} = useStore();

  console.log('userdata', userData);

  const handleStart = () => {
    if (userData.image !== '' && userData.nickname !== '') {
      navigation.navigate('TabNav');
    }
    if (
      userData.image === '' ||
      userData.nickname === '' ||
      userData.length === 0
    ) {
      navigation.navigate('CreateProfile');
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/img/onboardBg.png')}
      style={styles.container}>
      <ScrollView>
        <View
          style={{
            alignItems: 'center',
            marginTop: 70,
            marginHorizontal: 24,
            top: 20,
          }}>
          <Image
            source={require('../../assets/img/onboardMan.png')}
            style={styles.image}
          />
        </View>
        <View
          style={{
            marginBottom: 130,
            alignItems: 'center',
            marginHorizontal: 24,
          }}>
          <GradientText colors={['#FD0404', '#FBE30A']} style={styles.title}>
            Welcom to Splash & Track: Big Fishing
          </GradientText>
          <Text style={styles.secondaryText}>
            Track your fishing adventures, log your catches, mark the best
            fishing spots, and challenge yourself with fun fishing quizzes and
            games. Stay on top of your fishing journey with smart tools and
            insights!
          </Text>
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 24}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => handleStart()}
          style={{
            position: 'absolute',
            bottom: 40,
            width: '100%',
          }}>
          <LinearGradient
            colors={['#FD0404', '#FBE30A']}
            style={{padding: 15, borderRadius: 16, alignItems: 'center'}}>
            <Text style={styles.btnText}>Get started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  title: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Chango-Regular',
    // textAlign: 'center',
  },
  btnText: {fontSize: 18, fontWeight: '400', color: '#fff'},
  secondaryText: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
});

export default Onboard;
