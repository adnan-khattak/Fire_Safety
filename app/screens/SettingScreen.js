import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>John Doe</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Contact:</Text>
        <Text style={styles.value}>+1 123 456 7890</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>123 Main Street, City</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Device Name:</Text>
        <Text style={styles.value}>My Device</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Your Private Code:</Text>
        <Text style={styles.value}>ABC123</Text>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  card: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
  },
});
