import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useStore} from '../../store/context';

const SettingsScreen = () => {
  const [changeButton, setChangeButton] = useState(false);
  const [changePhoto, setChangePhoto] = useState(false);
  const [isEnabledMusic, setIsEnabledMusic] = useState(false);
  const [isEnabledNotifications, setIsEnabledMusicNotifications] =
    useState(false);
  const {saveUserData, userData, getUserData} = useStore();

  const [user, setUser] = useState({
    id: Date.now(),
    nickname: userData.nickname,
    image: userData.image,
  });
  const navigation = useNavigation();

  const toggleMusic = () => setIsEnabledMusic(previousState => !previousState);
  const toggleNotifications = () =>
    setIsEnabledMusicNotifications(previousState => !previousState);

  useEffect(() => {
    getUserData();
  }, []);

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 600,
      maxWidth: 600,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      setUser(prev => ({...prev, image: response.assets[0].uri}));

      setChangePhoto(true);
    });
  };

  const handleSaveData = () => {
    saveUserData(user);
    setChangeButton(true);
  };

  const isDisabled = userData.nickname === '' || userData.image === '';

  return (
    <Layout>
      <ScrollView style={{}}>
        <LinearGradient
          colors={['#3F3782', '#AE583D']}
          style={styles.headerContainer}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
              style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/icons/back.png')} />
              <Text style={styles.headerBtnText}>Back</Text>
            </TouchableOpacity>
            <Image
              source={require('../../assets/icons/widget.png')}
              tintColor={'#fff'}
            />
          </View>
        </LinearGradient>
        <View
          style={{
            marginHorizontal: 24,
            marginTop: 40,
            alignItems: 'center',
            marginBottom: 36,
          }}>
          {userData.image !== '' && (
            <View>
              <Image
                source={{uri: user.image}}
                style={{width: 141, height: 141, borderRadius: 99}}
              />
              <TouchableOpacity
                onPress={() => imagePicker()}
                activeOpacity={0.7}
                style={styles.addBtnContainer}>
                <Image source={require('../../assets/icons/add.png')} />
              </TouchableOpacity>
            </View>
          )}
          {userData.image === '' && (
            <View>
              {changePhoto ? (
                <View>
                  <Image
                    source={{uri: user.image}}
                    style={{width: 141, height: 141, borderRadius: 99}}
                  />
                  <TouchableOpacity
                    onPress={() => imagePicker()}
                    activeOpacity={0.7}
                    style={styles.addBtnContainer}>
                    <Image source={require('../../assets/icons/add.png')} />
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  <View style={styles.userImgContainer}></View>
                  <TouchableOpacity
                    onPress={() => imagePicker()}
                    activeOpacity={0.7}
                    style={styles.addBtnContainer}>
                    <Image source={require('../../assets/icons/add.png')} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          )}
        </View>
        <View style={{marginHorizontal: 16, marginTop: 35}}>
          <Text style={styles.sectionTitle}>Nickname</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              style={styles.input}
              maxLength={20}
              value={user.nickname}
              onChangeText={value =>
                setUser(prev => ({...prev, nickname: value}))
              }
            />

            {changeButton ? (
              <View
                activeOpacity={0.7}
                style={[styles.editBtn, {backgroundColor: '#34C759'}]}>
                <Image source={require('../../assets/icons/edited.png')} />
              </View>
            ) : (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.editBtn}
                onPress={() => handleSaveData()}>
                <Image source={require('../../assets/icons/edit.png')} />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View style={{marginHorizontal: 16, marginTop: 35}}>
          <View style={styles.settingsWrap}>
            <Text style={styles.settingsText}>Music</Text>
            <Switch
              onValueChange={toggleMusic}
              value={isEnabledMusic}
              style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
              trackColor={{true: '#FBE30A', false: 'grey'}}
              thumbColor={'#fff'}
            />
          </View>
          <View style={styles.settingsWrap}>
            <Text style={styles.settingsText}>Notifications</Text>
            <Switch
              onValueChange={toggleNotifications}
              value={isEnabledNotifications}
              style={{transform: [{scaleX: 1.4}, {scaleY: 1.4}]}}
              trackColor={{true: '#FBE30A', false: 'grey'}}
              thumbColor={'#fff'}
            />
          </View>
          <View style={styles.settingsWrap}>
            <Text style={styles.settingsText}>Reset the App</Text>
            <TouchableOpacity>
              <Image source={require('../../assets/icons/reset.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </Layout>
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
  headerContainer: {
    paddingTop: 80,
    paddingHorizontal: 16,
    borderRadius: 16,
    height: 130,
  },
  userImgContainer: {
    width: 141,
    height: 141,
    backgroundColor: '#3F3782',
    borderRadius: 110,
  },
  addBtnContainer: {
    width: 44,
    height: 44,
    backgroundColor: '#3BCFD9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  btnText: {fontSize: 18, fontWeight: '400', color: '#fff'},
  sectionTitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
    marginBottom: 10,
  },
  secondaryText: {
    marginTop: 24,
    fontSize: 20,
    fontWeight: '500',
    color: '#fff',
  },
  settingsText: {fontSize: 24, fontWeight: '500', color: '#fff'},
  headerBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FAC40C',
    marginLeft: 6,
  },
  input: {
    backgroundColor: '#3F378266',
    borderRadius: 16,
    paddingLeft: 20,
    paddingRight: 20,
    height: 51,
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    width: '80%',
  },
  editBtn: {
    width: 72,
    height: 56,
    backgroundColor: '#3BCFD9',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingsWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 37,
  },
});

export default SettingsScreen;
