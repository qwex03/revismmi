import React, { useState } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import BtnHelp from "@/components/ui/BtnHelp";

export default function PageWithTitle() {
  const [file, setFile] = useState(null);

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", 
        copyToCacheDirectory: true,
      });
      if (result) {
        setFile(result.assets[0]);
        console.log('File picked: ', result.assets[0]);
      }
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Créer un nouveau cours</Text>

        <View style={styles.cours}>
          <TouchableOpacity style={styles.button} onPress={selectFile}>
            <Text style={styles.buttonText}>A partir d'un fichier</Text>
            <Image source={require('@/assets/images/files.png')} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Prendre une Photo</Text>
            <Image source={require('@/assets/images/photo.png')} style={{ width: 50, height: 50, alignSelf: 'center', marginTop: 10 }} />
          </TouchableOpacity>
        </View>

        <BtnHelp title={"Comment créer un cours ?"} text={"Un cours est un espace pour apprendre, réviser, et se tester. Pour créer un cours, sélectionnez la manière dont vous voulez ajouter le contenu au cours (photo, importation d’un document, saisie du contenu dans un editeur de texte). Ensuite choississez un dossier dans lequel sera enregistré votre cours. Ensuite, l’IA se chargera de transformer vos notes/cours en cours et en flashcards."} />

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
    paddingTop: 50,
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
