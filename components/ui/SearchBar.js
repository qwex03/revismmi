import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";



const SearchBar = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Recherche flashcards, cours, classe"
      />
      <TouchableOpacity style={styles.profileIcon} onPress={()=> {router.push('/profile')}}>
        <Text>👤</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 100,
    marginTop: 20
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 16,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  profileIcon: {
    marginLeft: 10,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: "50%",
  },
});
