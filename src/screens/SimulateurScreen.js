import React from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';

const SimulateurScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Simulateur</Text>
      {/* Add your simulator UI here */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F6FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Futura',
    fontWeight: '500',
    fontSize: 24,
    color: '#333',
  },
});

export default SimulateurScreen;