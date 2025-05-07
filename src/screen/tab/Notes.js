import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useEffect} from 'react';
import {useStore} from '../../store/context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';

const Notes = () => {
  const {userData, getUserData, getUserNotes, userNotes, removeUserNote} =
    useStore();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  useEffect(() => {
    getUserData();
    getUserNotes();
  }, [isFocused]);

  const deleteNote = itemId => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeUserNote(itemId)}>
        <Image source={require('../../assets/icons/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  return (
    <Layout>
      <ScrollView>
        <View style={{marginHorizontal: 16, marginTop: 80}}>
          <View style={styles.headerContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {userData.image === '' || userData.length === 0 ? (
                <View style={styles.userImage}></View>
              ) : (
                <Image
                  source={{uri: userData.image}}
                  style={[styles.userImage, {backgroundColor: null}]}
                />
              )}
              <View style={{marginLeft: 10}}>
                <Text style={styles.welcomeText}>Welcome back,</Text>

                {userData.nickname === '' || userData.length === 0 ? (
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
          <View style={{paddingRight: 20}}>
            <Text style={styles.title}>
              Keep track of your fishing experiences, observations, and tips.
              Write down what worked, what didn’t, and make each trip better
              than the last!
            </Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addBtnContainer}
            onPress={() => navigation.navigate('CreateNote')}>
            <Text style={styles.addBtnText}>Add note</Text>
            <Image source={require('../../assets/icons/add.png')} />
          </TouchableOpacity>
        </View>
        <View style={{paddingRight: 16, marginTop: 32, marginBottom: 110}}>
          {userNotes.map(note => (
            <Swipeable
              renderRightActions={() => deleteNote(note.id)}
              key={note.id}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => navigation.navigate('ChickenCard', note)}
                style={styles.itemContainer}
                key={note.id}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.titleText}>{note.title}</Text>
                  <Text style={styles.dateText}>{note.date}</Text>
                </View>
                <Text style={styles.secondaryText}>{note.description}</Text>
              </TouchableOpacity>
            </Swipeable>
          ))}
        </View>
      </ScrollView>
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
    marginTop: 36,
    marginBottom: 60,
  },

  itemContainer: {
    backgroundColor: '#3F3782',
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginLeft: 16,
    marginBottom: 10,
    borderRadius: 32,
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    opacity: 0.8,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 7,
    marginLeft: 10,
  },
});

export default Notes;
