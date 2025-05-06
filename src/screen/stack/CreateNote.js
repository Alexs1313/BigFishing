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

// Get current date
const today = new Date();

let day = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

day = day < 10 ? '0' + day : day;
month = month < 10 ? '0' + month : month;

const formattedDate = `${day}.${month}.${year}`;

const CreateNote = () => {
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
          <Text style={styles.sectionTitle}>
            What would you call today’s adventure?
          </Text>
          <TextInput
            style={styles.input}
            maxLength={20}
            value={userData.title}
            onChangeText={value =>
              setUserData(prev => ({...prev, title: value}))
            }
          />
          <Text style={styles.sectionTitle}>
            Note down details you’d like to remember for next time…
          </Text>
          <TextInput
            style={[styles.input, {height: 160}]}
            textAlignVertical="top"
            maxLength={20}
            value={userData.description}
            onChangeText={value =>
              setUserData(prev => ({...prev, description: value}))
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

export default CreateNote;
