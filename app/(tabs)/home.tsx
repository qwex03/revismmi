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
  const [coursRecents, setCoursRecents] = useState(null);
  const [badgesRecents, setBadgesRecents] = useState(null);

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  useEffect(() => {
    const fetchCoursRecents = async () => {
      try {
        const userId = await getToken();
        const response = await fetch(`https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/users/${userId}/coursrecents`);
        const json = await response.json();
        setCoursRecents(json);
      } catch (error) {
        console.error('Error fetching cours recents:', error);
      }
    };

    const fetchBadgesRecents = async () => {
      try {
        const userId = await getToken();
        const response = await fetch(`https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/users/${userId}/badgesrecents`);
        const json = await response.json();
        setBadgesRecents(json);
      } catch (error) {
        console.error('Error fetching badges recents:', error);
      }
    };

    fetchCoursRecents();
    fetchBadgesRecents();
  }, []);

  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${day}/${month}/${year}`;
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <SearchBar />

        <View style={styles.list}>
          <SectionTitle title="Vos Derniers Cours" onSeeAll={() => {router.push("/revise")}} />
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

          <SectionTitle title="Vos Badges Récents" onSeeAll={() => {router.push("/profile")}} />
          {badgesRecents && badgesRecents.length > 0 ? (
            <FlatList
              data={badgesRecents}
              horizontal
              renderItem={({ item }) => (
                <AchievementCard
                  title={item.nom}
                  icon={item.icone}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[styles.horizontalList, styles.achievement]}
            />
          ) : (
            <View style={styles.noAchievements}>
              <Text style={styles.noAchievementsText}>Vous n'avez pas encore de badges récents.</Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
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
  noAchievements: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100, 
    backgroundColor: '#F5F5F5',
    marginVertical: 10,
    borderRadius: 8,
    padding: 10,
  },
  noAchievementsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
  },
});
