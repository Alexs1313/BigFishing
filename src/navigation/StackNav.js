import {createStackNavigator} from '@react-navigation/stack';
import Onboard from '../screen/stack/Onboard';
import TabNav from './TabNav';
import CreateProfile from '../screen/stack/CreateProfile';
import SettingsScreen from '../screen/stack/SettingsScreen';

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="TabNav" component={TabNav} />
    </Stack.Navigator>
  );
};

export default StackNav;
