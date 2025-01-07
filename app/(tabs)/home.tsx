import React from 'react';
import { View, FlatList, SafeAreaView } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import SectionTitle from '@/components/ui/SectionTitle';
import CourseCard from '@/components/ui/CoursCard';
import AchievementCard from '@/components/ui/AchievementCard';
import { StyleSheet } from 'react-native';
import { useRouter } from "expo-router";


const Dashboard = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <SearchBar />

        <View style={styles.list}>
        <SectionTitle title="Vos dernières Liste de Cours" onSeeAll={() => {router.push("/revise")}} />
        <FlatList
          data={[{ title: 'Probabilités', creator: 'Vous' }, { title: 'Histoires', creator: 'Vous' }, { title: 'Mathématiques', creator: 'Vous' }, { title: 'Mathématiques', creator: 'Vous' }]}
          horizontal
          renderItem={({ item }) => <CourseCard title={item.title} creator={item.creator} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={[styles.horizontalList, styles.lastcours]}
        />
        <SectionTitle title="Vos dernières Réalisations" onSeeAll={() => {router.push("/revise")}} />
        <FlatList
          data={[
            { title: '1er au quizz', icon: '🥇' },
            { title: '1h d’apprentissage', icon: '⏳' },
            { title: '3eme de la classe', icon: '🏆' },
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
    width: "100%",
    marginBottom: 5,
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
  }
});
