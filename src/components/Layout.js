import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Layout = ({children}) => {
  return (
    <LinearGradient
      colors={['#3F3782', '#AE583D']}
      style={styles.linearGradient}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
});

export default Layout;
