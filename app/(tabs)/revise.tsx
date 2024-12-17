import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import NavBar from "@/components/ui/NavBar";

export default function PageWithTitle() {
  return (
    <View style={styles.container}>
      <NavBar route={"/profile"} />
      <View style={styles.header}>
        <Text style={styles.title}>Vos matières</Text>
        <TouchableOpacity>
          <Text style={styles.buttonText}>Nouveau dossier</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.matieres}>
        <TouchableOpacity style={styles.matiere}>
          <View style={styles.leftSection}>
            <Image 
                source={require('@/assets/images/IconesCours/lhistoire.png')}
                style={styles.icones} 
            />
            <Text style={styles.matiereText}>Histoire</Text>
          </View>
          <Image 
            source={require('@/assets/images/BackArrow.png')} 
            style={styles.arrow} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.matiere}>
          <View style={styles.leftSection}>
            <Image 
                source={require('@/assets/images/IconesCours/mathematiques.png')}
                style={styles.icones} 
            />
            <Text style={styles.matiereText}>Mathématique</Text>
          </View>
          <Image 
            source={require('@/assets/images/BackArrow.png')} 
            style={styles.arrow} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.matiere}>
          <View style={styles.leftSection}>
            <Image 
                source={require('@/assets/images/IconesCours/globe.png')}
                style={styles.icones} 
            />
            <Text style={styles.matiereText}>Français</Text>
          </View>
          <Image 
            source={require('@/assets/images/BackArrow.png')} 
            style={styles.arrow} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.matiere}>
          <View style={styles.leftSection}>
            <Image 
                source={require('@/assets/images/IconesCours/la-physique.png')}
                style={styles.icones} 
            />
            <Text style={styles.matiereText}>Physique Chimie</Text>
          </View>
          <Image 
            source={require('@/assets/images/BackArrow.png')} 
            style={styles.arrow} 
          />
        </TouchableOpacity>
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonText: {
    fontSize: 16,
    color: '#007BFF',
  },
  matieres: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
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
