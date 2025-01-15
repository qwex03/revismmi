import React, { useState } from "react";
import BtnHelp from "@/components/ui/BtnHelp";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Picker } from "@react-native-picker/picker"; 
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';


const RegisterPage = () => {
  const router = useRouter();
  const [formdata, setFormdata] = useState({
    email: "",
    password: "",
    confirmationPassword: "",
    pseudo: "",
    role: "", 
  });
  const [message, setMessage] = useState('');

  const saveToken = async (token: string) => {
    const tokenString = JSON.stringify(token); 
    await SecureStore.setItemAsync('userToken', tokenString)
  } 


  const handleRegister = async () => {
    try {
    const response = await fetch(`https://sae501.mateovallee.fr/inscription`, {
      method: 'POST', 
      body: JSON.stringify({
          email: formdata.email,
          password: formdata.password,
          confirmationPassword: formdata.confirmationPassword,
          pseudo: formdata.pseudo,
          role: formdata.role
      })
  });
    const json = await response.json();
    if(json.error) {
      console.log(json)
      setMessage("Erreur d'inscription");
    } else {
      await saveToken(json.id);
    }
  } catch (error) {
    console.error('Error register in:', error);
  }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RévisMMI</Text>

      <View style={styles.loginBox}>
        <Text style={styles.subtitle}>Inscription</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#aaa"
          value={formdata.email}
          onChangeText={(text) => setFormdata({ ...formdata, email: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
          value={formdata.password}
          onChangeText={(text) => setFormdata({ ...formdata, password: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirmation Mot de passe"
          secureTextEntry={true}
          placeholderTextColor="#aaa"
          value={formdata.confirmationPassword}
          onChangeText={(text) => setFormdata({ ...formdata, confirmationPassword: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Pseudo"
          placeholderTextColor="#aaa"
          value={formdata.pseudo}
          onChangeText={(text) => setFormdata({ ...formdata, pseudo: text })}
        />

        <Text style={styles.label}>Sélectionnez votre rôle :</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formdata.role}
            onValueChange={(itemValue) =>
              setFormdata({ ...formdata, role: itemValue })
            }
            style={styles.picker}
          >
            <Picker.Item label="Choisissez un rôle" value="" />
            <Picker.Item label="Étudiant" value="student" />
            <Picker.Item label="Enseignant" value="teacher" />
          </Picker>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={async () =>{
            await handleRegister();
            router.push({
              pathname: '/condition',
              params: { first: "true" },
            })
          }
          }
        >
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>
      </View>

      <BtnHelp
        color={"#9DC3E0"}
        title={"Comment s'inscrire ?"}
        text={
          "L'inscription sur RévisMMI est simple et rapide. Suivez ces étapes : Saisissez votre email : Entrez une adresse email valide, qui sera utilisée pour vous identifier et récupérer votre compte en cas d'oubli de mot de passe. Choisissez un mot de passe : Créez un mot de passe sécurisé pour protéger votre compte. Il doit comporter au moins 6 caractères, avec des chiffres et des lettres pour plus de sécurité. Confirmez votre mot de passe : Pour vous assurer que vous n'avez pas fait de faute de frappe, saisissez à nouveau votre mot de passe dans ce champ. Sélectionnez un pseudo : Choisissez un pseudo unique qui sera visible sur votre profil et dans vos interactions sur la plateforme. Une fois ces informations saisies, cliquez sur S'inscrire pour finaliser votre inscription."
        }
      />
    </View>
  );
};

export default RegisterPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0B93FD",
    paddingTop: 50
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
  picker: {
    backgroundColor: "white",
    borderRadius: 20,
  },
  label: {
    color: 'white'
  },
  pickerContainer: {
    marginBottom: 10,
  }
});



