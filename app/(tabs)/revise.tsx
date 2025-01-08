import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import MatiereItem from "@/components/ui/MatBtn";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

export default function PageWithTitle() {
  const router = useRouter();
  const [mat, setMat] = useState(null);
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
        const response = await fetch(`https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/users/${userId}/categories`);
        const json = await response.json();
        setMat(json);
        setFilter(json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
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
      )
    }
  }, [search, mat]);

  return (
    <SafeAreaView  style={styles.safeContainer}>
      <View style={styles.container}>
      <SearchBar
      placeholder="Rechercher une matière"
      value={search}
      onChangeText={(text: string) => setSearch(text)}
      />
        <View style={styles.header}>
          <Text style={styles.title}>Vos matières</Text>
          <TouchableOpacity onPress={() => {router.push('/newcours')}} style={styles.button}>
            <Text style={styles.buttonText}>Nouveau dossier</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.matieres}
        contentContainerStyle={{ paddingBottom: 85 }}
        >
          {loading ? (
            <Text>Chargement...</Text>
          ) : (
            filter.map((matiere, index) => (
              <MatiereItem key={index} text={matiere.nom} iconSource={matiere.url_icone} onPress={() => {
                router.push({
                  pathname: '/categorie',
                  params: { catId: matiere.id },
                });
              }} />
            ))
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
  matiere: {
    width: "100%",
    height: 96,
    borderRadius: 20,
    backgroundColor: "#F4F8FA",
    marginBottom: 15,
    display: "flex",
    flexDirection: "row", 
    alignItems: "center", 
    justifyContent: "space-between", 
    paddingHorizontal: 16, 
  },
  leftSection: {
    flexDirection: "row", 
    alignItems: "center",
  },
  matiereText: {
    marginLeft: 10, 
    fontSize: 18,
    fontWeight: "bold",
    color: '#333',
  },
  icones: {
    width: 54,
    height: 54
  }, 
  arrow : {
    width: 54,
    height: 54,
    transform: [{rotate: '180deg'}],
  }
});
