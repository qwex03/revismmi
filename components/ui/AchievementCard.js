import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const AchievementCard = ({ title, icon, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.icon}>{String.fromCodePoint(icon)}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default AchievementCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    width: 115,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    fontSize: 32,
    marginBottom: 10,
    color: '#4CAF50',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333333',
  },
});
