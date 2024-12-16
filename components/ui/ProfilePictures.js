import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const ProfilePicture = () => {
    return (
        <View style={styles.profileCircle}>
            <Image
            source={require('@/assets/images/Profile.png')} 
            style={styles.profileImage}
            />
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
});

export default ProfilePicture;

