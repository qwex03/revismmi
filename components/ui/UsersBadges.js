import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Modal, TouchableOpacity, Image } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { BlurView } from 'expo-blur';
import AchievementCard from './AchievementCard';

const UserBadges = () => {
  const [badges, setBadges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBadge, setSelectedBadge] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

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

  const handleBadgePress = (badge) => {
    setSelectedBadge(badge);
    setModalVisible(true);
  };

  if (isLoading) return <Text>Chargement des badges...</Text>;

  if (error) return <Text>Erreur : {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos Badges 🏆</Text>
      <FlatList
        data={badges}
        horizontal
        renderItem={({ item }) => (
          <AchievementCard
            title={item.nom}
            icon={item.image}
            onPress={() => handleBadgePress(item)} 
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Aucun badge disponible</Text>}
      />

      <Modal
        transparent
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <BlurView intensity={50} style={styles.blurBackground}>
          <View style={styles.modalContent}>
            {selectedBadge && (
              <>
                <Text style={styles.modalImage}>{String.fromCodePoint(selectedBadge.image)}</Text>
                <Text style={styles.modalTitle}>{selectedBadge.nom}</Text>
                <Text style={styles.modalDescription}>{selectedBadge.description}</Text>
              </>
            )}
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>
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
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: 160,
    marginBottom: 10,
  },
  blurBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    fontSize: 50,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default UserBadges;
