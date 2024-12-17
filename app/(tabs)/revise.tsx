import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import NavBar from "@/components/ui/NavBar";
import MatiereItem from "@/components/ui/MatBtn";

export default function PageWithTitle() {
  return (
    <View style={styles.container}>
      <NavBar route={"/profile"} />
      <View style={styles.header}>
        <Text style={styles.title}>Vos matières</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Nouveau dossier</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.matieres}
      contentContainerStyle={{ paddingBottom: 85 }}
      >
        <MatiereItem 
          text="Histoire" 
          iconSource={require('@/assets/images/IconesCours/lhistoire.png')} 
          onPress={() => console.log("Histoire sélectionnée")} 
        />
        <MatiereItem 
          text="Mathématique" 
          iconSource={require('@/assets/images/IconesCours/mathematiques.png')} 
          onPress={() => console.log("Mathématique sélectionnée")} 
        />
        <MatiereItem 
          text="Français" 
          iconSource={require('@/assets/images/IconesCours/globe.png')} 
          onPress={() => console.log("Français sélectionné")} 
        />
        <MatiereItem 
          text="Physique Chimie" 
          iconSource={require('@/assets/images/IconesCours/la-physique.png')} 
          onPress={() => console.log("Physique Chimie sélectionnée")} 
        />
      </ScrollView>
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
  header: {
    flexDirection: 'row', 
    width: '80%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: 10,
    backgroundColor: "#0B93FD",
    borderRadius: 20
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  matieres: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  matiere: {
    width: "100%",
    height: 96,
    borderRadius: 20,
    backgroundColor: "#F4F8FA",
    marginBottom: 15,
    display: "flex",
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
  },
  leftSection: {
    flexDirection: "row", 
    alignItems: "center",
  },
  matiereText: {
    marginLeft: 10, 
    fontSize: 18,
    fontWeight: "bold",
    color: '#333',
  },
  icones: {
    width: 54,
    height: 54
  }, 
  arrow : {
    width: 54,
    height: 54,
    transform: [{rotate: '180deg'}],
  }
});
