import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const BtnSubmit = ({ test }) => {
   
    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={test}
        >
            <Text style={styles.text}>Enregistrer</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        padding: "1em",
        backgroundColor: "#0B93FD",
        textAlign: "center",
    },
    text: {
        color: "white",
    }
});

export default BtnSubmit;