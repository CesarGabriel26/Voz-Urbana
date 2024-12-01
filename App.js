import { StyleSheet, View } from 'react-native';
import { ThemeProvider } from './app/utils/ThemeContext';
import Routes from './app/components/Routes'
import NetworkCheck from './app/utils/NetWorkState';

export default function App() {
  return (
    <NetworkCheck>
      <ThemeProvider style={styles.container}>
        <Routes />
      </ThemeProvider>
    </NetworkCheck>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
