import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";


export default function PageWithTitle() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer un nouveau cours</Text>

      <View style={styles.cours}>
        <TouchableOpacity style={styles.button} onPress={() => {router.push('/settings-change')}}>
          <Text style={styles.buttonText}>A partir d'un fichier</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {router.push('/settings-change')}}>
          <Text style={styles.buttonText}>Prendre une Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {router.push('/settings-change')}}>
          <Text style={styles.buttonText}>A partir d'une image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {router.push('/settings-change')}}>
          <Text style={styles.buttonText}>A partir d'un editeur de texte</Text>
        </TouchableOpacity>
      </View>
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
  cours: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  button : {
    backgroundColor: "#F4F8FA"
  }, 
  buttonText: {
    color: "black"
  }
});
