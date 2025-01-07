import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PageWithTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Classes</Text>
      <Text>Arrive dans la prochaine mise à jour</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFDFEC',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', 
  },
});
