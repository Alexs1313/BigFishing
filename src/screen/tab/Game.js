import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const Game = () => {
  const navigation = useNavigation();

  return (
    <Layout>
      <ScrollView>
        <View style={{marginHorizontal: 16, marginTop: 80}}>
          <View style={{}}>
            <Text style={styles.title}>
              Think you're a fishing expert? Let's find out!
            </Text>
            <Text style={[styles.title, {fontWeight: '400'}]}>
              Answer fun and challenging questions about fishing techniques,
              fish species, bait, and more. Improve your knowledge and become a
              true angler!
            </Text>
          </View>
        </View>
        <View style={{marginHorizontal: 24}}>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Quiz')}
            style={{
              width: '100%',
              marginTop: 40,
              marginBottom: 140,
            }}>
            <LinearGradient
              colors={['#FD0404', '#FBE30A']}
              style={{padding: 15, borderRadius: 16, alignItems: 'center'}}>
              <Text style={styles.btnText}>Play</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  btnText: {fontSize: 18, fontWeight: '400', color: '#fff'},
  itemContainer: {
    backgroundColor: '#3F3782',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginLeft: 16,
    marginBottom: 10,
    borderRadius: 32,
  },
});

export default Game;
