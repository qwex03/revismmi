import React, { useEffect, useState } from 'react';
import { View, FlatList, SafeAreaView, Text, StyleSheet } from 'react-native';
import SearchBar from '@/components/ui/SearchBar';
import SectionTitle from '@/components/ui/SectionTitle';
import CourseCard from '@/components/ui/CoursCard';
import AchievementCard from '@/components/ui/AchievementCard';
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import UserBadges from '@/components/ui/UsersBadges';

const Dashboard = () => {
  const router = useRouter();
  const [coursRecents, setCoursRecents] = useState(null);
  const [badgesRecents, setBadgesRecents] = useState(null);
  const [pseudo, setPseudo] = useState('');

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  useEffect(() => {
    const fetchCoursRecents = async () => {
      try {
        const userId = await getToken();
        const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}/coursrecents`);
        const json = await response.json();
        setCoursRecents(json);
      } catch (error) {
        console.error('Error fetching cours recents:', error);
      }
    };

    const fetchBadgesRecents = async () => {
      try {
        const userId = await getToken();
        const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}/badgesrecents`);
        const json = await response.json();
        setBadgesRecents(json);
      } catch (error) {
        console.error('Error fetching badges recents:', error);
      }
    };

    fetchCoursRecents();
    fetchBadgesRecents();
  }, []);



    useEffect(() => {
        const fetchData = async () => {
          try {
            const userId = await getToken();
            const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}`);
            const json = await response.json();
            setPseudo(json.pseudo)
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
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

        <Text style={styles.HelloText}>Bonjour {pseudo} 👋 !</Text>
        <View style={styles.list}>
          <SectionTitle title="Vos Derniers Cours" onSeeAll={() => { router.push("/revise") }} />
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
            <View style={styles.noContent}>
              <Text style={styles.noContentText}>Vous n'avez pas encore de cours récents.</Text>
            </View>
          )}

          <SectionTitle title="Vos Badges Récents" onSeeAll={() => { router.push("/profile") }} />
          {badgesRecents && badgesRecents.length > 0 ? (
            <FlatList
              data={badgesRecents}
              horizontal
              renderItem={({ item }) => (
                <AchievementCard
                  title={item.nom}
                  icon={item.image}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={[styles.horizontalList, styles.achievement]}
            />
          ) : (
            <View style={styles.noContent}>
              <Text style={styles.noContentText}>Vous n'avez pas encore de badges récents.</Text>
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
    backgroundColor: '#F2F7FB',
    padding: 16,
  },
  horizontalList: {
    marginHorizontal: 0,
  },
  achievement: {
    marginVertical: 10,
  },
  safeContainer: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: '12%',
  },
  lastcours: {
    marginVertical: 10,
  },
  list: {
    flexDirection: 'column',
    gap: 20,
  },
  noContent: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 120,
    backgroundColor: '#F8FAFD',
    marginVertical: 10,
    borderRadius: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E0E7ED',
  },
  noContentText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
  },
  HelloText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#343A40',
    textAlign: 'left',
    textShadowColor: '#B0C4DE',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    marginBottom: 20
  },
});
