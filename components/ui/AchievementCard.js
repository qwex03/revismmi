import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


const AchievementCard = ({ title, icon }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default AchievementCard;

const styles = StyleSheet.create({
    card: {
      borderRadius: 10,
      padding: 10,
      marginRight: 10,
      alignItems: 'center',
      height: 100,
    },
    icon: {
      fontSize: 24,
      marginBottom: 8,
    },
    title: {
      fontSize: 12,
      fontWeight: 'bold',
      fontStyle: 'normal',
      textAlign: 'center',
    },
  });