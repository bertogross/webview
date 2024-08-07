import React from 'react';
import 'expo-dev-client';
import { SafeAreaView, StyleSheet } from 'react-native';
import CustomWebView from './components/CustomWebView';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomWebView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
