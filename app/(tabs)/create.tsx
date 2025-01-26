import React, { useState, useEffect } from 'react';
import * as DocumentPicker from 'expo-document-picker';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, Modal, ActivityIndicator } from 'react-native';
import BtnHelp from "@/components/ui/BtnHelp";
import * as SecureStore from 'expo-secure-store';
import { Picker } from '@react-native-picker/picker';
import { BlurView } from 'expo-blur';
import BtnSubmit from '@/components/ui/BtnSubmit';

export default function PageWithTitle() {
  const [file, setFile] = useState(null);
  const [visible, setVisible] = useState(false);
  const [categorie, setCategorie] = useState('');
  const [userCategories, setUserCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  const selectFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "*/*", 
        copyToCacheDirectory: true,
      });
      if (result) {
        setFile(result.assets[0]);
        setVisible(true);
      }
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  const FetchAllCategories = async () => {
    try {
      const userId = await getToken();
      const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}/categories`);
      const json = await response.json();
      setUserCategories(json);
    } catch (err) {
      console.error('Error picking document: ', err);
    }
  };

  useEffect(() => {
    FetchAllCategories();
  }, []);

  const uploadFile = async () => {
    if (!file) {
      return;
    }

    setLoading(true);
    const userId = await getToken();
    const formData = new FormData();
    formData.append('file', {
      uri: file.uri,
      name: file.name,
      type: file.mimeType,
    });
    formData.append('userId', userId);
    formData.append('categorieId', categorie);

    try {
      // REMPLACEZ L'IPV4 DANS L'URL PAR l'IPV4 DE VOTRE MACHINE //
      const response = await fetch('http://192.168.131.35:3000/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const json = await response.json();
      setVisible(false);
    } catch (error) {
      console.error('Upload Error: ', error);
    } finally {
      setLoading(false);
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

        <Modal
          visible={visible}
          animationType="fade"
          onRequestClose={() => {
            setVisible(!visible);
          }}>
          <BlurView intensity={50} style={styles.blurBackground}>
            <View style={styles.modalContent}>
              {loading ? (
                <ActivityIndicator size="large" color="#6200ee" />
              ) : (
                <>
                  <Text>Choisissez la matière pour votre cours</Text>
                  <Picker
                    selectedValue={categorie}
                    onValueChange={(itemValue) => setCategorie(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    {userCategories.map((cat) => (
                      <Picker.Item key={cat.id} label={cat.nom} value={cat.id} />
                    ))}
                  </Picker>
                  <TouchableOpacity>
                    <BtnSubmit test={async () => await uploadFile()} />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </BlurView>
        </Modal>
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
  },
  blurBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  picker: {
    width: 200,
    height: 50,
  },
  pickerItem: {
    height: 44,
  },
});

