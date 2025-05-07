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

const FishingSession = ({route}) => {
  const time = route.params;
  const [saved, setSaved] = useState(false);
  const {saveFishingData, isEnabledNotifications} = useStore();
  const [fishingData, setFishingData] = useState({
    id: Date.now(),
    spotName: '',
    fishType: '',
    weight: '',
    bait: '',
    method: '',
    weather: '',
    notes: '',
    date: formattedDate,
    time,
  });
  const navigation = useNavigation();

  console.log('route', time);

  const handleSaveData = () => {
    saveFishingData(fishingData);
    setSaved(true);
    if (isEnabledNotifications) {
      Toast.show({
        text1: 'Fishing created successfully!',
      });
    }
    setTimeout(() => {
      navigation.goBack();
    }, 300);
  };

  const {spotName, weight, fishType, bait, method, weather, notes} =
    fishingData;

  const handleGoBack = () => {
    if (
      spotName !== '' ||
      weight !== '' ||
      bait !== '' ||
      notes !== '' ||
      fishType !== '' ||
      method !== '' ||
      (notes !== '' && !saved)
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
    fishType.trim() === '' ||
    weight.trim() === '' ||
    bait.trim() === '' ||
    method.trim() === '' ||
    weather.trim() === '' ||
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
            style={[styles.addBtnContainer, {backgroundColor: '#34C759'}]}
            onPress={() => navigation.navigate('FishingSession')}>
            <Text style={styles.addBtnText}>Catch</Text>

            <Image source={require('../../assets/icons/add.png')} />
          </View>
          <Text style={styles.sectionTitle}>Name the Spot ✏️</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={fishingData.spotName}
            onChangeText={value =>
              setFishingData(prev => ({...prev, spotName: value}))
            }
          />
          <Text style={styles.sectionTitle}>Fish Type 🐟</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={fishingData.fishType}
            onChangeText={value =>
              setFishingData(prev => ({...prev, fishType: value}))
            }
          />

          <Text style={styles.sectionTitle}>Weight ⚖️ </Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={fishingData.weight}
            onChangeText={value =>
              setFishingData(prev => ({...prev, weight: value}))
            }
          />

          <Text style={styles.sectionTitle}>Bait Used 🪱</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={fishingData.bait}
            onChangeText={value =>
              setFishingData(prev => ({...prev, bait: value}))
            }
          />
          <Text style={styles.sectionTitle}>Fishing Method 🎯</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={fishingData.method}
            onChangeText={value =>
              setFishingData(prev => ({...prev, method: value}))
            }
          />
          <Text style={styles.sectionTitle}>Weather Conditions ☀️🌧️</Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={fishingData.weather}
            onChangeText={value =>
              setFishingData(prev => ({...prev, weather: value}))
            }
          />
          <Text style={styles.sectionTitle}>Personal Notes 📝</Text>
          <TextInput
            style={[styles.input, {marginBottom: 120}]}
            maxLength={20}
            value={fishingData.notes}
            onChangeText={value =>
              setFishingData(prev => ({...prev, notes: value}))
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
            position: 'absolute',
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

export default FishingSession;
