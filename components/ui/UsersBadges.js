import React, { useEffect, useState} from 'react';
import { View, Image, Text, StyleSheet, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AchievementCard from './AchievementCard';


const UserBadges = () => {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getToken = async () => {
      return await SecureStore.getItemAsync('userToken');
  };

  useEffect(() => {
      const fetchAllBadges = async () => {
          try {
              const userId = await getToken();
              if (!userId) throw new Error('User token is missing');

              const response = await fetch(`https://sae501.mateovallee.fr/users/${userId}/badges`);
              if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

              const json = await response.json();
              setBadges(json);
          } catch (error) {
              console.error('Error fetching badges:', error);
              setError(error.message);
          } finally {
              setIsLoading(false);
          }
      };

      fetchAllBadges();
  }, []);

  if (isLoading) return <Text>Chargement des badges...</Text>;

  if (error) return <Text>Erreur : {error}</Text>;

  return (
      <View style={styles.container}>
          <Text style={styles.title}>Vos Badges</Text>
          <FlatList
            data={badges}
            horizontal
            renderItem={({ item }) => (
              <AchievementCard
                title={item.nom}
                icon={item.image}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={<Text style={styles.emptyMessage}>Aucun badge disponible</Text>}
          />
      </View>
  );
};

const styles = StyleSheet.create({
  title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 10,
      textAlign: 'center',
  },
  emptyMessage: {
      fontSize: 16,
      color: '#999',
      textAlign: 'center',
      marginTop: 20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 160,
    marginBottom: 10,
  }
});

export default UserBadges;
