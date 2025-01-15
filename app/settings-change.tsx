import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image, SafeAreaView } from "react-native";
import { useState } from 'react';
import { useRouter } from "expo-router";
import BackArrow from "@/components/ui/BackArrow"; 
import ProfilePicture from "@/components/ui/ProfilePictures";
import BtnSubmit from "@/components/ui/BtnSubmit";
import * as SecureStore from 'expo-secure-store';

export default function SettingsPage() {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    email: '',
    motDePasse: '',
    pseudo: '',
  });

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };
  
  const handleSubmit = async () => {
    try {
      const userId = await getToken();
      const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}`, {
        method: "PUT",
        body: JSON.stringify({
          email: formdata.email,
          password: formdata.motDePasse,
          pseudo: formdata.pseudo,
        })
      })
      const json = await response.json();
    } catch(err) {
      console.log("erreur serveur", err)
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>

        <ProfilePicture />

        <View style={styles.header}>
          <BackArrow route={"/profile"} />
          <Text>Paramètres</Text>
        </View>

        <Text style={styles.section}>Informations personnelles</Text>

        <TextInput
            style={styles.input}
            placeholder="Nouveau mail"
            placeholderTextColor="#aaa"
            value={formdata.email}
            onChangeText={(text) => setFormdata({ ...formdata, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nouveau Mot de passe"
            secureTextEntry={true}
            placeholderTextColor="#aaa"
            value={formdata.motDePasse}
            onChangeText={(text) => setFormdata({ ...formdata, motDePasse: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Changez de pseudo"
            placeholderTextColor="#aaa"
            value={formdata.pseudo}
            onChangeText={(text) => setFormdata({ ...formdata, pseudo: text })}
          />
          <BtnSubmit test={handleSubmit}/>
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
