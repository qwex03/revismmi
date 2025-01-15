import React, { useEffect, useState} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';



const ProfilePicture = () => {
    const getToken = async () => {
        return await SecureStore.getItemAsync('userToken');
      };
    const [pseudo, setPseudo] = useState('');
    const [niveau, setNiveau] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = await getToken();
            const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}`);
            const json = await response.json();
            console.log(json);
            setPseudo(json.pseudo);
            setNiveau(json.niveau)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.pseudo}>{pseudo}</Text>

            <View style={styles.profileCircle}>
                <Image
                source={require('@/assets/images/Profile.png')} 
                style={styles.profileImage}
                />
            </View>
            <Text style={styles.niveau}>Niveau {niveau}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
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
      pseudo:  {
        fontSize: 24,
        fontWeight: "bold",
        marginVertical: 20,
        color: "#333",
        textAlign: "center",
      },
      container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }, 
      niveau: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 12,
        textAlign: "center"
      }
});

export default ProfilePicture;

