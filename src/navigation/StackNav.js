import {createStackNavigator} from '@react-navigation/stack';
import Onboard from '../screen/stack/Onboard';
import TabNav from './TabNav';
import CreateProfile from '../screen/stack/CreateProfile';
import SettingsScreen from '../screen/stack/SettingsScreen';
import CreateNote from '../screen/stack/CreateNote';
import Quiz from '../screen/stack/Quiz';
import Map from '../screen/stack/Map';
import MarkLocation from '../screen/stack/MarkLocation';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} /> */}

      <Stack.Screen name="TabNav" component={TabNav} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="CreateNote" component={CreateNote} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Map" component={Map} />
      <Stack.Screen name="MarkLocation" component={MarkLocation} />
    </Stack.Navigator>
  );
};

export default StackNav;
