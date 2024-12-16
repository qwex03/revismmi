import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

const ChoiceLoginPage = () => {
    const router = useRouter();

    const handleRegister = () => {
        router.push("/register");
    };

    const handleLogin = () => {
        router.push("/login");
    };

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Bienvenue sur RévisMMI</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Se Connecter</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0B93FD",
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#FFFFFF",
      marginBottom: 40,
      textAlign: "center",
    },
    buttonContainer: {
      width: "80%",
      justifyContent: "space-between",
      alignItems: "center",
    },
    button: {
      width: "100%",
      height: 50,
      backgroundColor: "#62A4D5",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 20,
    },
    buttonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
  });
  

export default ChoiceLoginPage;