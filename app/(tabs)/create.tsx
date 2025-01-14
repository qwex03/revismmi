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
        uploadFile();
      }
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  const uploadFile = async () => {
    if (!file) {
      console.log('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    });

    try {
      const response = await fetch('http://10.62.148.134:3000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Upload Error: ', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Créer un nouveau cours</Text>

        <View style={styles.cours}>
          <TouchableOpacity style={styles.button} onPress={selectFile}>
            <Text style={styles.buttonText}>A partir d'un fichier</Text>
            <Image source={require('@/assets/images/files.png')} style={styles.icon} />
          </TouchableOpacity>
        </View>

        <BtnHelp 
          title={"Comment créer un cours ?"} 
          text={"Un cours est un espace pour apprendre, réviser, et se tester. Pour créer un cours, sélectionnez la manière dont vous voulez ajouter le contenu au cours (photo, importation d’un document). Ensuite, choisissez un dossier dans lequel sera enregistré votre cours. Ensuite, l’IA se chargera de transformer vos notes/cours en cours et en flashcards."} 
        />

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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFDFEC', 
    paddingHorizontal: 20,
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
  },
  cours: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: "#F4F8FA", 
    height: 150,
    width: '100%',
    padding: 15,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: "#333", 
    textAlign: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  }
});
