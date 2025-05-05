import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
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
  const [changePhoto, setChangePhoto] = useState(false);
  const {saveUserData, userData, getUserData} = useStore();
  const [user, setUser] = useState({
    id: Date.now(),
    nickname: '',
    image: '',
  });
  const navigation = useNavigation();

  useEffect(() => {
    getUserData();
  }, []);

  console.log('userDataSet', userData);

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

      setUserData(prev => ({...prev, image: response.assets[0].uri}));
      setChangePhoto(true);
    });
  };

  const handleSaveData = () => {
    saveUserData(userData);
    navigation.navigate('TabNav');
  };

  const isDisabled = userData.nickname === '' || userData.image === '';

  return (
    <Layout>
      <ScrollView style={{}}>
        <LinearGradient
          colors={['#3F3782', '#AE583D']}
          style={styles.headerContainer}>
          <TouchableOpacity
            style={{flexDirection: 'row', justifyContent: 'space-between'}}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row'}}>
              <Image source={require('../../assets/icons/back.png')} />
              <Text style={styles.headerBtnText}>Back</Text>
            </View>
            <Image
              source={require('../../assets/icons/widget.png')}
              tintColor={'#fff'}
            />
          </TouchableOpacity>
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
                source={{uri: userData.image}}
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
        <View style={{marginHorizontal: 16, marginTop: 35}}>
          <Text style={styles.sectionTitle}>Nickname</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={userData.nickname}
            onChangeText={value =>
              setUser(prev => ({...prev, nickname: value}))
            }
          />
        </View>
      </ScrollView>
      <View style={{marginHorizontal: 24}}>
        <TouchableOpacity
          disabled={isDisabled}
          activeOpacity={0.7}
          onPress={() => handleSaveData()}
          style={{
            bottom: 40,
            width: '100%',
          }}>
          <LinearGradient
            colors={
              isDisabled ? ['#CCCCCC', '#CCCCCC'] : ['#FD0404', '#FBE30A']
            }
            style={{padding: 15, borderRadius: 16, alignItems: 'center'}}>
            <Text style={styles.btnText}>Save</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
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
    height: 65,
    fontSize: 17,
    fontWeight: '400',
    color: '#fff',
    width: '100%',
    marginBottom: 5,
  },
});

export default SettingsScreen;
