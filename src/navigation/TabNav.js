import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';

import Locations from '../screen/tab/Locations';
import Notes from '../screen/tab/Notes';
import Game from '../screen/tab/Game';
import Home from '../screen/tab/Home';

const Tab = createBottomTabNavigator();

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarActiveTintColor: '#F46C5C',
        tabBarInactiveTintColor: '#3BCFD9',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/tabIcons/home.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Locations"
        component={Locations}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/tabIcons/locations.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/tabIcons/notes.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Game"
        component={Game}
        options={{
          tabBarIcon: ({color}) => (
            <Image
              source={require('../assets/tabIcons/game.png')}
              style={{tintColor: color}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderTopWidth: 0,
    height: 105,
    paddingBottom: 5,
    paddingTop: 16,
    position: 'absolute',
    bottom: 0,
    elevation: 0,
  },
  tabBarLabelStyle: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '600',
  },
});

export default TabNav;
