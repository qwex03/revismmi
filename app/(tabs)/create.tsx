import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import BtnHelp from "@/components/ui/BtnHelp";

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

      <BtnHelp title={"Comment créer un cours ?"} text={"Un cours est un espace pour apprendre, réviser, et se tester. Pour créer un cours, sélectionnez la manière dont vous voulez ajouter le contenu au cours (photo, importation d’un document, saisie du contenu dans un editeur de texte). Ensuite choississez un dossier dans lequel sera enregistré votre cours. Ensuite, l’IA se chargera de transformer vos notes/cours en cours et en flashcards."} />

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
    justifyContent: "space-between", 
    flexWrap: "wrap",  
    width: '100%',  
    paddingHorizontal: 20,  
  },
  button : {
    backgroundColor: "#F4F8FA",
    height: 147,
    width: '48%',  
    padding: 10,
    marginTop: 20,
    borderRadius: 20,
    marginBottom: 20,  
  }, 
  buttonText: {
    color: "black",
    textAlign: 'center',  
  }
});
