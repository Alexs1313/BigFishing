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

const Onboard = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require('../../assets/img/onboardBg.png')}
      style={styles.container}>
      <ScrollView>
        <View
          style={{alignItems: 'center', marginTop: 70, marginHorizontal: 24}}>
          <Image
            source={require('../../assets/img/onboardMan.png')}
            style={styles.image}
          />
          <View style={{position: 'absolute', bottom: -235}}>
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
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 24}}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('CreateProfile')}
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
    textAlign: 'center',
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
