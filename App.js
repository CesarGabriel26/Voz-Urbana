import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Routes from './app/components/Routes';
import { ThemeProvider } from './app/utils/ThemeContext';


export default function App() {
  return (
    <ThemeProvider style={styles.container}>
      <StatusBar style="auto" />

      <Routes />
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
