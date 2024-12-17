import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";


export default function RolesPages () {
  const router = useRouter();

    return(
        <View style={styles.container}>
            <Text style={styles.title}>RévisMMI</Text>
            <View style={styles.rolesBox}>
                <Text style={styles.subtitle}>Je suis</Text>
                <TouchableOpacity style={styles.button} onPress={() => {router.push('/')}}>
                    <Text style={styles.buttonText}>Etudiant</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => {router.push('/')}}>
                    <Text style={styles.buttonText}>Enseignant</Text>
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
    },
    rolesBox: {
      width: "80%",
      borderRadius: 20,
      padding: 20,
    },
    subtitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#FFFFFF",
      marginBottom: 20,
      textAlign: "center",
    },
    button: {
      height: 50,
      backgroundColor: "#62A4D5",
      borderRadius: 20,
      marginBottom: 15,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      fontSize: 16,
      color: "#fff",
      fontWeight: "bold",
    },
  });
  