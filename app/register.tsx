import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const LoginPage = () => {
  return (
    <View style={styles.container}>
      {/* Titre principal */}
      <Text style={styles.title}>RévisMMI</Text>

      {/* Bloc de connexion */}
      <View style={styles.loginBox}>
        <Text style={styles.subtitle}>Inscription</Text>

        {/* Champs d'entrée */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />
         <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />
         <TextInput
          style={styles.input}
          placeholder="Pseudo"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
        />

        {/* Bouton de connexion */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

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
  loginBox: {
    width: "80%",
    borderRadius: 20,
    padding: 20
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  button: {
    height: 50,
    backgroundColor: "#62A4D5",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default LoginPage;
