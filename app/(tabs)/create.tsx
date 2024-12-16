import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PageWithTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFDFEC', // Couleur de fond
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Couleur du texte
  },
});
