import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import { useState } from 'react';
import { useRouter } from "expo-router";
import BackArrow from "@/components/ui/BackArrow"; 
import ProfilePicture from "@/components/ui/ProfilePictures";
import BtnSubmit from "@/components/ui/BtnSubmit";


export default function SettingsPage() {
  const router = useRouter();
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');

  
  const handleSubmit = () => {
    const formData = {
      email,
      motDePasse,
      pseudo,
    };

    console.log("Données du formulaire : ", formData);

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pseudo</Text>

      <ProfilePicture />

      <View style={styles.header}>
        <BackArrow route={"/settings"} />
        <Text style={styles.title}>Paramètres</Text>
      </View>

      <Text style={styles.section}>Informations personnelles</Text>

      <TextInput
          style={styles.input}
          placeholder="Nouveau mail"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Nouveau Mot de passe"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
          value={motDePasse}
          onChangeText={setMotDePasse}
        />
        <TextInput
          style={styles.input}
          placeholder="Changez de pseudo"
          placeholderTextColor="#aaa"
          value={pseudo}
          onChangeText={setPseudo}
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
    paddingHorizontal: 16,
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
