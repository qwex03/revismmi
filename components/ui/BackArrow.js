import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

const BackArrow = ({ route, color = "#000000" }) => { 
    const router = useRouter();

    const handlePress = () => {
        if (route) {
            router.push(route); 
        } else {
            console.warn("Aucune route spécifiée pour BackArrow."); 
        }
    };

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={handlePress}
        >
            <Image 
                source={require('../../assets/images/BackArrow.png')} 
                style={[styles.arrow, { tintColor: color }]} 
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    arrow: {
        width: 32,  
        height: 32,
        resizeMode: 'contain', 
    },
});

export default BackArrow;
