import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Layout from '../../components/Layout';
import {useEffect, useState} from 'react';
import {useStore} from '../../store/context';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Swipeable} from 'react-native-gesture-handler';
import SegmentedControl from 'react-native-segmented-control-2';

const Locations = () => {
  const [selecdedIdx, setSelectedIdx] = useState(0);
  const {
    userData,
    getLocation,
    getFishingData,
    removeLocation,
    removeFishingData,
    locations,
    fishingData,
  } = useStore();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  function secondsToTime(e) {
    const m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, '0'),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, '0');

    return `${m}:${s}`;
  }

  console.log(locations, fishingData);

  useEffect(() => {
    getLocation(), getFishingData();
  }, [isFocused]);

  const deleteLocation = itemId => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeLocation(itemId)}>
        <Image source={require('../../assets/icons/delete.png')} />
      </TouchableOpacity>
    </View>
  );

  const deleteFisshingCard = itemId => (
    <View style={{justifyContent: 'center'}}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => removeFishingData(itemId)}>
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
            <Text style={styles.title}>Search new locations, go to map!</Text>
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.addBtnContainer}
            onPress={() => navigation.navigate('Map')}>
            <Text style={styles.addBtnText}>Open map</Text>
            <Image source={require('../../assets/icons/map.png')} />
          </TouchableOpacity>

          <SegmentedControl
            style={{
              marginTop: 19,
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              borderRadius: 7,
              height: 35,
              width: '100%',
            }}
            activeTabColor="#F46C5C"
            activeTextColor="#FFFFFF"
            textStyle={{color: '#fff'}}
            tabs={['Locations', 'Fishing sessions']}
            selectedTabStyle={{
              borderRadius: 7,
              borderColor: 'rgba(0, 0, 0, 0.04)',
              borderWidth: 0.5,
              textShadowColor: 'rgba(0, 0, 0, 0.04)',
              textShadowOffset: {width: 0, height: 3},
              textShadowRadius: 8,
            }}
            onChange={index => setSelectedIdx(index)}
          />
        </View>
        <View style={{paddingRight: 16, marginTop: 32, marginBottom: 110}}>
          {selecdedIdx === 0 ? (
            <View>
              {locations.length === 0 ? (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Map')}
                  activeOpacity={0.7}
                  style={{alignItems: 'center', marginTop: 80}}>
                  <Text style={styles.goToMapText}>Go to the map </Text>
                </TouchableOpacity>
              ) : (
                <View>
                  {locations.map(location => (
                    <Swipeable
                      renderRightActions={() => deleteLocation(location.id)}
                      key={location.id}>
                      <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() =>
                          navigation.navigate('ChickenCard', location)
                        }
                        style={styles.itemContainer}
                        key={location.id}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <Text style={styles.titleText}>
                            {location.spotName}
                          </Text>
                          <Text style={styles.dateText}>{location.date}</Text>
                        </View>
                        <Text style={styles.secondaryText}>
                          🌊 {location.waterType}
                        </Text>
                        <Text style={styles.secondaryText}>
                          🐟 {location.fishType}
                        </Text>
                        <Text style={styles.notesText}>{location.notes}</Text>
                      </TouchableOpacity>
                    </Swipeable>
                  ))}
                </View>
              )}
            </View>
          ) : (
            <View>
              <View>
                {fishingData.length === 0 ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Map')}
                    activeOpacity={0.7}
                    style={{
                      alignItems: 'center',
                      marginTop: 80,
                      marginBottom: 20,
                    }}>
                    <Text style={styles.goToMapText}>Go to the map </Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    {fishingData.map(item => (
                      <Swipeable
                        renderRightActions={() => deleteFisshingCard(item.id)}
                        key={item.id}>
                        <TouchableOpacity
                          activeOpacity={0.9}
                          onPress={() =>
                            navigation.navigate('ChickenCard', item)
                          }
                          style={styles.itemContainer}
                          key={item.id}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text style={styles.titleText}>
                              {item.spotName}
                            </Text>
                            <Text style={styles.dateText}>{item.date}</Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}>
                            <Text
                              style={[styles.titleText, {color: '#F46C5C'}]}>
                              Time of session :
                            </Text>
                            <Text style={[styles.dateText, {color: '#F46C5C'}]}>
                              {secondsToTime(item.time)}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 20,
                            }}>
                            <Text style={styles.notesText}>
                              ⚖️ {item.weight}
                            </Text>
                            <Text style={styles.notesText}>{item.bait} 🪱</Text>
                            <Text style={styles.notesText}>
                              🐟 {item.fishType}
                            </Text>
                          </View>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'center',
                              gap: 20,
                            }}>
                            <Text style={styles.notesText}>
                              🎯 {item.method}
                            </Text>
                            <Text style={styles.notesText}>
                              ☀️🌧️ {item.weather}
                            </Text>
                          </View>
                          <Text style={styles.secondaryText}>{item.notes}</Text>
                        </TouchableOpacity>
                      </Swipeable>
                    ))}
                  </View>
                )}
              </View>
            </View>
          )}
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
  goToMapText: {fontSize: 24, fontWeight: '500', opacity: 0.4, color: '#fff'},
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
    marginBottom: 4,
  },
  secondaryText: {
    fontSize: 14,
    fontWeight: '400',
    color: '#fff',
    opacity: 0.8,
    marginTop: 6,
  },
  dateText: {
    fontSize: 12,
    fontWeight: '400',
    color: '#fff',
  },
  notesText: {fontSize: 14, fontWeight: '600', color: '#fff', marginTop: 12},
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

export default Locations;
