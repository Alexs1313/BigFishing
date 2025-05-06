import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useStore} from '../store/context';
import {useEffect} from 'react';

const Header = () => {
  const {userData, getUserData} = useStore();

  useEffect(() => {
    getUserData();
  }, []);

  return (
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
});

export default Header;
