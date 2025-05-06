import {
  Alert,
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
import GradientText from '../../components/GradientText';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {launchImageLibrary} from 'react-native-image-picker';
import {useStore} from '../../store/context';
import MapView, {Marker} from 'react-native-maps';

// Get current date
const today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

day = day < 10 ? '0' + day : day;
month = month < 10 ? '0' + month : month;

const formattedDate = `${day}.${month}.${year}`;

const Map = () => {
  const [changePhoto, setChangePhoto] = useState(false);
  const [saved, setSaved] = useState(false);
  const {saveUserNotes, userNotes} = useStore();
  const [userData, setUserData] = useState({
    id: Date.now(),
    title: '',
    description: '',
    date: formattedDate,
  });
  const navigation = useNavigation();
  const [markers, setMarkers] = useState([]);
  const [marker, setMarker] = useState(null);

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setMarker(coordinate);
  };

  console.log('userdata', userData);

  const handleSaveData = () => {
    saveUserNotes(userData);
    setSaved(true);
    setTimeout(() => {
      navigation.goBack();
    }, 300);
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
    }
  };

  const isDisabled = title.trim() === '' || description.trim() === '';

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
              <Image
                source={require('../../assets/icons/customMarker.png')}
                style={styles.markerImage}
              />
            </Marker>
          )}
        </MapView>
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
      {/* <ScrollView>
        <View style={{marginHorizontal: 16, marginTop: 24}}></View>
      </ScrollView> */}
      <LinearGradient
        colors={['#3F3782', '#AE583D']}
        style={styles.footerContainer}>
        <View style={{marginHorizontal: 14}}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addBtnContainer}
            onPress={() => navigation.navigate('MarkLocation')}>
            <Text style={styles.addBtnText}>Mark location</Text>
            <Image source={require('../../assets/icons/marker.png')} />
          </TouchableOpacity>

          <TouchableOpacity
            disabled={isDisabled}
            activeOpacity={0.7}
            onPress={() => handleSaveData()}
            style={{
              width: '100%',
            }}>
            <LinearGradient
              colors={['#FD0404', '#FBE30A']}
              style={{padding: 15, borderRadius: 16, alignItems: 'center'}}>
              <Text style={styles.btnText}>Fishing session</Text>
            </LinearGradient>
          </TouchableOpacity>
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
});

export default Map;
