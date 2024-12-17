import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image, Platform } from "react-native";
import { useRouter } from "expo-router";
import ProfilePicture from "@/components/ui/ProfilePictures";

export default function SettingsPage() {
  const router = useRouter();
  const handleLogout = () => {
    Alert.alert("Déconnexion", "Vous êtes maintenant déconnecté.");
  };


  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: () => Alert.alert("Compte supprimé.") },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pseudo</Text>

      <ProfilePicture/>

      <View>
        <Text style={styles.title}>Paramètres</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => {router.push('/settings-change')}}>
        <Text style={styles.buttonText}>Informations personnelles</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {router.push('/politique')}}>
        <Text style={styles.buttonText}>Politique de confidentialité</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => {router.push('/politique')}}>
        <Text style={styles.buttonText}>Conditions générales d'utilisation</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
        <Text style={[styles.buttonText, styles.logoutText]}>Se déconnecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
        <Text style={[styles.buttonText, styles.deleteText]}>Supprimer le compte</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#333",
  },
  button: {
    width: "100%",
    backgroundColor: "#F4F8FA",
    paddingVertical: 15,
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
    fontSize: 16,
    color: "#333",
    textAlign: "center",
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
 
});
