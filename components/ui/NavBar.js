import React from 'react';
import { TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import { View } from 'react-native-web';

const NavBar = ({ route, color = "#000000" }) => { 
    const router = useRouter();

    const handlePress = () => {
        if (route) {
            router.push(route); 
        } else {
            console.warn("Aucune route spécifiée pour NavBar."); 
        }
    };

    return (
        <View style={styles.nav}>
            <TextInput style={styles.input}
            placeholder='Rechercher un cours, une Flashcard, un Quiz'
            placeholderTextColor="black"
            /> 
            <TouchableOpacity style={styles.container} onPress={handlePress}>
                <Image 
                    source={require('@/assets/images/Profile.png')} 
                    style={[styles.picture]} 
                />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    nav: {
        display: "flex",
        flexDirection: "row",
        width: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 20
    },
    picture: {
        borderRadius: "50%",
        height: "68px",
        width: "68px"
    }, 
    input: {
        height: 33,
        padding: 10,
        borderRadius: 20,
        backgroundColor: "white",
        width: "80%"
    }
});

export default NavBar;
