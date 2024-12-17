import React from "react";
import BtnHelp from "@/components/ui/BtnHelp";


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

      <BtnHelp color={"#9DC3E0"} title={"Comment s'inscrire ?"} text={"L'inscription sur RévisMMI est simple et rapide. Suivez ces étapes : Saisissez votre email : Entrez une adresse email valide, qui sera utilisée pour vous identifier et récupérer votre compte en cas d'oubli de mot de passe. Choisissez un mot de passe : Créez un mot de passe sécurisé pour protéger votre compte. Il doit comporter au moins 6 caratères, avec des chiffres et des lettres pour plus de sécurité. Confirmez votre mot de passe : Pour vous assurer que vous n'avez pas fait de faute de frappe, saisissez à nouveau votre mot de passe dans ce champ. Sélectionnez un pseudo : Choisissez un pseudo unique qui sera visible sur votre profil et dans vos interactions sur la plateforme. Une fois ces informations saisies, cliquez sur S'inscrire pour finaliser votre inscription."} />
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
