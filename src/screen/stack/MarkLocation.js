import {
  Alert,
  Image,
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
import {useState} from 'react';
import {useStore} from '../../store/context';
import Toast from 'react-native-toast-message';

// Get current date
const today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

day = day < 10 ? '0' + day : day;
month = month < 10 ? '0' + month : month;

const formattedDate = `${day}.${month}.${year}`;

const MarkLocation = () => {
  const [saved, setSaved] = useState(false);
  const {saveLocation, setCurrentLocation, isEnabledNotifications} = useStore();
  const [locationData, setlocationData] = useState({
    id: Date.now(),
    spotName: '',
    waterType: '',
    fishType: '',
    notes: '',
    date: formattedDate,
  });
  const navigation = useNavigation();

  console.log('location', locationData);

  const handleSaveData = () => {
    saveLocation(locationData);
    setSaved(true);
    setCurrentLocation(locationData);
    if (isEnabledNotifications) {
      Toast.show({
        text1: 'Location created successfully!',
      });
    }
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const {spotName, waterType, fishType, notes} = locationData;

  const handleGoBack = () => {
    if (
      spotName !== '' ||
      fishType !== '' ||
      notes !== '' ||
      (waterType !== '' && !saved)
    ) {
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

  const isDisabled =
    spotName.trim() === '' ||
    waterType.trim() === '' ||
    fishType.trim() === '' ||
    notes.trim() === '';

  return (
    <Layout>
      <ScrollView>
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

        <View style={{marginHorizontal: 16, marginTop: 24}}>
          <View
            activeOpacity={0.7}
            style={styles.addBtnContainer}
            onPress={() => navigation.navigate('MarkLocation')}>
            <Text style={styles.addBtnText}>Mark location</Text>
            <Image source={require('../../assets/icons/marker.png')} />
          </View>
          <Text style={styles.sectionTitle}>Name the Spot ✏️</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={locationData.spotName}
            onChangeText={value =>
              setlocationData(prev => ({...prev, spotName: value}))
            }
          />
          <Text style={styles.sectionTitle}>Water Type 🌊</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={locationData.waterType}
            onChangeText={value =>
              setlocationData(prev => ({...prev, waterType: value}))
            }
          />

          <Text style={styles.sectionTitle}>Fish Type Expected 🐟 </Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={locationData.fishType}
            onChangeText={value =>
              setlocationData(prev => ({...prev, fishType: value}))
            }
          />

          <Text style={styles.sectionTitle}>Personal Notes 📝</Text>
          <TextInput
            style={[styles.input, {marginBottom: 60}]}
            maxLength={20}
            value={locationData.notes}
            onChangeText={value =>
              setlocationData(prev => ({...prev, notes: value}))
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
    paddingLeft: 16,
    borderRadius: 16,
    height: 130,
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
    marginBottom: 36,
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

export default MarkLocation;
