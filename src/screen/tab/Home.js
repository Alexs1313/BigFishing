import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Layout from '../../components/Layout';
import {tips} from '../../data/tips';
import {useEffect, useState} from 'react';
import {useStore} from '../../store/context';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const Home = () => {
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(false);
  const {userData, getUserData} = useStore();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  console.log('userData', userData);

  useEffect(() => {
    getUserData();
  }, [isFocused]);

  const randomNumber = Math.floor(Math.random() * (19 - 1 + 1) + 1);

  return (
    <Layout>
      <View style={{marginHorizontal: 16, marginTop: 80}}>
        <View style={styles.headerContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {userData.image === '' ? (
              <View style={styles.userImage}></View>
            ) : (
              <Image
                source={{uri: userData.image}}
                style={[styles.userImage, {backgroundColor: null}]}
              />
            )}
            <View style={{marginLeft: 10}}>
              <Text style={styles.welcomeText}>Welcome back,</Text>

              {userData.nickname === '' ? (
                <Text style={styles.usernameText}>User</Text>
              ) : (
                <Text style={styles.usernameText}>{userData.nickname}</Text>
              )}
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('SettingsScreen')}>
            <Image source={require('../../assets/icons/widget.png')} />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Tip of the Day 🎯</Text>
        <View style={{}}>
          {isOpenEnvelope ? (
            <View>
              <View style={{alignItems: 'center'}}>
                <Image
                  source={require('../../assets/img/openedEnvelope.png')}
                />
              </View>
              <View style={styles.envelopeContainer}>
                <Text>{tips[randomNumber]}</Text>
              </View>
            </View>
          ) : (
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setIsOpenEnvelope(true)}>
                <Image source={require('../../assets/img/envelope.png')} />
              </TouchableOpacity>
              <Text style={[styles.title, {marginBottom: 30, opacity: 0.4}]}>
                Tap on the envelope
              </Text>
            </View>
          )}
        </View>
        <Text style={[styles.title, {textAlign: 'left'}]}>
          Recent Locations 📍
        </Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 16,
  },
  userImage: {
    width: 60,
    height: 60,
    backgroundColor: '#3F3782',
    borderRadius: 99,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#3F3782',
  },
  usernameText: {
    fontSize: 24,
    fontWeight: '400',
    color: '#3F3782',
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFFFF',
    textAlign: 'center',
    marginTop: 36,
    marginBottom: 60,
  },
  envelopeContainer: {
    width: '100%',
    paddingHorizontal: 32,
    paddingVertical: 16,
    backgroundColor: '#F8F6CC',
    position: 'absolute',
    bottom: -20,
    borderRadius: 16,
  },
});

export default Home;
