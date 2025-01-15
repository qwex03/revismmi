import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';

const LoginPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });

  const saveToken = async (token: string) => {
    const tokenString = JSON.stringify(token); 
    await SecureStore.setItemAsync('userToken', tokenString)
  } 

  const handleLogin = async () => {
    try {
      const response = await fetch(`https://sae501.mateovallee.fr/connexion`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            email: formdata.email,
            password: formdata.password
        })
    });
    const json = await response.json();
    if(json.error) {
      setMessage("Erreur de connexion");
    } else {
      await saveToken(json.id);
      router.push("/home");
    }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>RévisMMI</Text>

      <View style={styles.loginBox}>
        <Text style={styles.subtitle}>Connectez-vous</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>
        <Text style={styles.error}>{message}</Text>
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
    padding: 20,
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
  error: {
    fontSize: 16,
    color: "red",
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  }
});

export default LoginPage;
