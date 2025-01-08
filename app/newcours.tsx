import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { useState } from 'react';
import { useRouter } from "expo-router";
import BackArrow from "@/components/ui/BackArrow"; 
import BtnSubmit from "@/components/ui/BtnSubmit";
import * as SecureStore from 'expo-secure-store';


export default function SettingsPage() {
  const router = useRouter();
  const [nom, setNom] = useState('');
  const [formdata, setFormdata] = useState({
    icone: '',
    nom: '',
  });

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };
  
  const handleSubmit = async () => {
    try {
      const userId = await getToken();
      const response = await fetch(`https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/categories`, {
        method: 'POST', 
        body: JSON.stringify({
            nom: formdata.nom,
            id_user: userId,
            id_icone: Number(formdata.icone)
        })
      });
      const json = await response.json();
      if(json.error) {
        console.log(json)
      } else {
        console.log(json)
        router.push('/revise')
      }
    } catch (err) {
      console.error('Error register in:', err);
    }
  };

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <BackArrow route={"/revise"} />
        <Text style={styles.title}>Cours</Text>
      </View>

      <Text style={styles.section}>Ajout d'un dossier</Text>

      <TextInput
          style={styles.input}
          placeholder="Nouveau nom du dossier"
          placeholderTextColor="#aaa"
          value={formdata.nom}
          onChangeText={(text) => setFormdata({ ...formdata, nom: text })}
        />

      <TextInput
          style={styles.input}
          placeholder="Icone du dossier"
          placeholderTextColor="#aaa"
          value={formdata.icone}
          onChangeText={(text) => setFormdata({ ...formdata, icone: text })}
        />
        <BtnSubmit test={handleSubmit}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#CFE0EC",
    padding: 20,
    paddingBottom: 80, 
  },
  header: {
    display: "flex",
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
    alignItems: "center"
  },
  section: {
    color: "black",
    backgroundColor: "#9DC3E0",
    borderRadius: 20,
    paddingVertical: 8,
    marginVertical: 10,
    textAlign: "center",
    width: "80%"
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  button: {
    width: "40%",
    backgroundColor: "#F4F8FA",
    paddingVertical: 15,
    textAlign: "center",
    paddingHorizontal: 20,
    borderRadius: 20,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#62A4D5",
  },
  logoutText: {
    color: "black",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#FF5E5E",
  },
  deleteText: {
    color: "black",
    fontWeight: "bold",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    width: "80%",
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  }
 
});
