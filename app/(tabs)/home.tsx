import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, Text } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import SectionTitle from '@/components/ui/SectionTitle';
import CourseCard from '@/components/ui/CoursCard';
import AchievementCard from '@/components/ui/AchievementCard';
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';

const Dashboard = () => {
  const router = useRouter();
  const [coursRecents, setCourRecents] = useState(null);

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = await getToken();
        console.log(userId);
        const response = await fetch(`https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/users/${userId}/coursrecents`);
        const json = await response.json();
        setCourRecents(json);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateStr: string) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <SearchBar />

        <View style={styles.list}>
        <SectionTitle title="Vos dernières Liste de Cours" onSeeAll={() => {router.push("/revise")}} />
        {coursRecents && coursRecents.length > 0 ? (
        <FlatList
          data={coursRecents}
          horizontal
          renderItem={({ item }) => (
            <CourseCard
              title={item.nom}
              creator={item.createur}
              date={formatDate(item.derniere_visite.date)}
              onPress={() => router.push({
                pathname: '/test',
                params: { testId: item.id },
              })}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[styles.horizontalList, styles.lastcours]}
        />
      ) : (
        <View style={styles.noCourses}>
          <Text style={styles.noCoursesText}>Vous n'avez pas encore de cours récents.</Text>
        </View>
      )}
        <SectionTitle title="Vos dernières Réalisations" onSeeAll={() => {router.push("/revise")}} />
        <FlatList
          data={[
            { title: '1er au quizz', icon: String.fromCodePoint(0x1FAE0) },
            { title: '1h d’apprentissage', icon: String.fromCodePoint(0x23F3) },
            { title: '3eme de la classe', icon: String.fromCodePoint(0x1F3C6) },
          ]}
          horizontal
          renderItem={({ item }) => <AchievementCard title={item.title} icon={item.icon} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[styles.horizontalList, styles.achievement]}
        />

        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;


const styles =  StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5F0FB',
    padding: 16,

  },
  horizontalList: {
    margin: 0,
  },
  achievement: {
    backgroundColor: 'white', 
    height: 100, 
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: "12%",
  },
  lastcours: {
    height: 150,
    marginBottom: 5,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  noCourses: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100, 
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
  },
  noCoursesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
