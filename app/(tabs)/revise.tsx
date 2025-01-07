import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import MatiereItem from "@/components/ui/MatBtn";
import { useRouter } from "expo-router";


export default function PageWithTitle() {
  const router = useRouter();


  return (
    <SafeAreaView  style={styles.safeContainer}>
      <View style={styles.container}>
      <SearchBar />
        <View style={styles.header}>
          <Text style={styles.title}>Vos matières</Text>
          <TouchableOpacity onPress={() => {router.push('/newcours')}} style={styles.button}>
            <Text style={styles.buttonText}>Nouveau dossier</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.matieres}
        contentContainerStyle={{ paddingBottom: 85 }}
        >
          <MatiereItem 
            text="Histoire" 
            iconSource={require('@/assets/images/IconesCours/lhistoire.png')} 
            onPress={() => {router.push('/test')}}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: "12%",
  },
  container: {
    flex: 1,
    backgroundColor: '#E5F0FB',
    padding: 16,
  },
  header: {
    flexDirection: 'row', 
    width: '100%', 
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
    width: "100%",
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
