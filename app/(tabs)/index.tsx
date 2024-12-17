import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavBar from "@/components/ui/NavBar";


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <NavBar route={"/profile"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CFDFEC',
  }
});
