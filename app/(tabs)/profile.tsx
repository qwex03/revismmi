import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, SafeAreaView } from "react-native";
import { useRouter } from "expo-router";
import ProfilePicture from "@/components/ui/ProfilePictures";
import * as SecureStore from 'expo-secure-store';
import UserBadges from "@/components/ui/UsersBadges";

export default function SettingsPage() {
  const router = useRouter();

  const DeleteToken = async () => {
    return await SecureStore.deleteItemAsync('token');
  };
  
  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };


  const DeleteAccount = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`https://sae501.mateovallee.fr/users/${token}`, {
        method: 'DELETE'
      });
      const json = await response.json();
      if (json.message) {
        await DeleteToken();
        console.log("success");
      } else {
        console.log(json);
        console.log("erreur lors de la suppression du commpte")
      }
    } catch (err) {
      console.log("Erreur serveur : ", err);
    }
  }

  const handleLogout = () => {
    Alert.alert("Déconnexion",
       "Voulez-vous vraiment vous déconnecter ?",
      [
        {
          text: "Annuler", style: "cancel"
        }, {
          text: "Ok",
          style: "destructive",
          onPress: async () => {
            await DeleteToken();
            router.push('/login');
          }
        }
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Supprimer le compte",
      "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        { text: "Supprimer", style: "destructive", onPress: async() => {
          await DeleteAccount();
          router.push('/login'); 
        }
        },

      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>

        <ProfilePicture />
        <UserBadges/>

        <View>
          <Text style={styles.title}>Paramètres</Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => { router.push('/settings-change') }}>
          <Text style={styles.buttonText}>Informations personnelles</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { router.push('/politique') }}>
          <Text style={styles.buttonText}>Politique de confidentialité</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => { router.push('/condition') }}>
          <Text style={styles.buttonText}>Conditions générales d'utilisation</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.buttonText, styles.logoutText]}>Se déconnecter</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleDeleteAccount}>
          <Text style={[styles.buttonText, styles.deleteText]}>Supprimer le compte</Text>
        </TouchableOpacity>
      </ScrollView>
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
    backgroundColor: "#CFE0EC",
    padding: 20,
    paddingBottom: 80,
  },
  scrollContent: {
    alignItems: "center",
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
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
});
