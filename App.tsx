import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import TabNav from './src/navigation/TabNav';
import StackNav from './src/navigation/StackNav';
import {StoreProvider} from './src/store/context';

const App = () => {
  return (
    <NavigationContainer>
      <StoreProvider>
        <StackNav />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
