import React, { useEffect, useState} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';



const ProfilePicture = () => {
    const getToken = async () => {
        return await SecureStore.getItemAsync('userToken');
      };
    const [pseudo, setPseudo] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = await getToken();
            const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}`);
            const json = await response.json();
            setPseudo(json.pseudo)
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
      }
});

export default ProfilePicture;

