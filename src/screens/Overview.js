import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Overview() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Overview</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.9,
    backgroundColor: '#b3d9ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});