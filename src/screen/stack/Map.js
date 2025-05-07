import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {useStore} from '../../store/context';
import MapView, {Marker} from 'react-native-maps';
import Orientation from 'react-native-orientation-locker';

// Get current date
const today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

day = day < 10 ? '0' + day : day;
month = month < 10 ? '0' + month : month;

const formattedDate = `${day}.${month}.${year}`;

const Map = () => {
  const [saved, setSaved] = useState(false);
  const {getLocation, currentLocation, setCurrentLocation} = useStore();
  const [userData, setUserData] = useState({
    id: Date.now(),
    title: '',
    description: '',
    date: formattedDate,
  });
  const navigation = useNavigation();
  const [marker, setMarker] = useState(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startSession, setStartSession] = useState(false);

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = totalSeconds => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0',
    )}`;
  };

  const handleToggleTimer = () => {
    setIsRunning(!isRunning), setStartSession(!startSession);
  };

  const handleStopTimer = () => {
    setIsRunning(false), setStartSession(false), setTime(0);
  };

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setMarker(coordinate);
  };

  const {title, description} = userData;

  const handleGoBack = () => {
    if (title !== '' || (description !== '' && !saved)) {
      Alert.alert(
        'Wait! You’ve Got Unsaved Changes',
        'Looks like you’ve made some updates. If you leave now, your changes will be lost',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel'),
            style: 'cancel',
          },
          {
            text: 'Leave',
            onPress: () => navigation.goBack(),
          },
        ],
        {cancelable: false},
      );
    } else {
      navigation.goBack();
      setCurrentLocation([]);
    }
  };

  return (
    <Layout>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={handleMapPress}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {marker && (
            <Marker coordinate={marker}>
              {/* <Image
                source={require('../../assets/icons/customMarker.png')}
                style={styles.markerImage}
              /> */}
            </Marker>
          )}
        </MapView>
        {startSession && (
          <View style={{alignItems: 'center'}}>
            <View style={styles.timerContainer}>
              <Text style={styles.timerText}>{formatTime(time)}</Text>
            </View>
          </View>
        )}
      </View>

      <LinearGradient
        colors={['#3F3782', '#AE583D']}
        style={styles.headerContainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => handleGoBack()}
            activeOpacity={0.7}
            style={{flexDirection: 'row'}}>
            <Image source={require('../../assets/icons/back.png')} />
            <Text style={styles.headerBtnText}>Back</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <LinearGradient
        colors={['#3F3782', '#AE583D']}
        style={styles.footerContainer}>
        <View style={{marginHorizontal: 14}}>
          {!startSession && (
            <View>
              {currentLocation.spotName === '' ||
              currentLocation.length === 0 ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={styles.addBtnContainer}
                  onPress={() => navigation.navigate('MarkLocation')}>
                  <Text style={styles.addBtnText}>Mark location</Text>

                  <Image source={require('../../assets/icons/marker.png')} />
                </TouchableOpacity>
              ) : (
                <View
                  activeOpacity={0.7}
                  style={[
                    styles.addBtnContainer,
                    {justifyContent: 'center', backgroundColor: '#34C759'},
                  ]}>
                  <Text style={styles.addBtnText}>
                    {currentLocation.spotName}
                  </Text>
                </View>
              )}
            </View>
          )}

          {startSession && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[styles.addBtnContainer, {backgroundColor: '#34C759'}]}
              onPress={() => {
                navigation.navigate('FishingSession', time),
                  setIsRunning(false);
              }}>
              <Text style={styles.addBtnText}>Catch</Text>

              <Image source={require('../../assets/icons/add.png')} />
            </TouchableOpacity>
          )}

          {startSession ? (
            <TouchableOpacity
              activeOpacity={0.7}
              style={[
                styles.addBtnContainer,
                {backgroundColor: '#F46C5C', justifyContent: 'center'},
              ]}
              onPress={() => handleStopTimer()}>
              <Text style={styles.addBtnText}>End fishing</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleToggleTimer()}
              style={{
                width: '100%',
              }}>
              <LinearGradient
                colors={['#FD0404', '#FBE30A']}
                style={styles.gradientBtn}>
                <Text style={styles.btnText}>Fishing session</Text>
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerImage: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '400',
    fontFamily: 'Chango-Regular',
    textAlign: 'center',
  },

  headerContainer: {
    paddingTop: 80,
    paddingLeft: 16,
    borderRadius: 16,
    height: 130,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  footerContainer: {
    paddingTop: 26,
    paddingBottom: 35,
    paddingLeft: 16,
    borderRadius: 16,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  headerBtnText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#FAC40C',
    marginLeft: 6,
  },
  userImgContainer: {
    width: 141,
    height: 141,
    backgroundColor: '#3F3782',
    borderRadius: 110,
  },

  addBtnText: {
    fontSize: 18,
    fontWeight: '400',
    color: '#fff',
  },
  timerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
  },
  timerContainer: {
    position: 'absolute',
    bottom: 200,
    paddingVertical: 24,
    paddingHorizontal: 60,
    backgroundColor: '#3F3782',
    borderRadius: 16,
  },
  addBtnContainer: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 16,
    width: '100%',
    backgroundColor: '#3BCFD9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
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
    marginLeft: 5,
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
    marginBottom: 16,
  },
  gradientBtn: {
    paddingVertical: 13,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default Map;
