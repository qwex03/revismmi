import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import MatiereItem from "@/components/ui/MatBtn";
import SearchBar from "@/components/ui/SearchBar";

export default function PageWithTitle() {
  const router = useRouter();
  const [mat, setMat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState([]);

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getToken();
        const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}/categories`);
        const json = await response.json();
        if (Array.isArray(json)) {
          setMat(json);
          setFilter(json);
        } else {
          setFilter([]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    if (search === '') {
      setFilter(mat);
    } else {
      setFilter(
        mat.filter((matiere) => matiere.nom.toLowerCase().includes(search.toLowerCase()))
      );
    }
  }, [search, mat]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <SearchBar
          placeholder="Recherche dans les matières"
          value={search}
          onChangeText={(text: string) => setSearch(text)}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Vos matières</Text>
          <TouchableOpacity onPress={() => {router.push('/newcours')}} style={styles.button}>
            <Text style={styles.buttonText}>Nouveau dossier</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.matieres} contentContainerStyle={{ paddingBottom: 85 }}>
        {loading ? (
          <Text>Chargement...</Text>
        ) : (
          Array.isArray(filter) ? (
            filter.map((matiere, index) => (
              <MatiereItem
                key={index}
                text={matiere.nom}
                iconSource={matiere.url_icone}
                onPress={() => {
                  router.push({
                    pathname: '/categorie',
                    params: { catId: matiere.id },
                  });
                }}
              />
            ))
          ) : (
            <Text style={styles.emptyText}>Aucune matière disponible.</Text>
          )
        )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: "12%",
  },
  container: {
    flex: 1,
    backgroundColor: '#E5F0FB',
    padding: 16,
  },
  header: {
    flexDirection: 'row', 
    width: '100%', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    padding: 10,
    backgroundColor: "#0B93FD",
    borderRadius: 20
  },
  buttonText: {
    fontSize: 16,
    color: 'white',
  },
  matieres: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 20,
  },
});
