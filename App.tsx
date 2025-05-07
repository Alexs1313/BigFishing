import {NavigationContainer} from '@react-navigation/native';
import {Text, View} from 'react-native';
import TabNav from './src/navigation/TabNav';
import StackNav from './src/navigation/StackNav';
import {StoreProvider} from './src/store/context';
import Toast from 'react-native-toast-message';
import Loader from './src/components/Loader';
import {useEffect, useState} from 'react';

const App = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

  return (
    <NavigationContainer>
      <StoreProvider>
        {loader ? <StackNav /> : <Loader />}
        <Toast position="top" topOffset={50} />
      </StoreProvider>
    </NavigationContainer>
  );
};

export default App;
