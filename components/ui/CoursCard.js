import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const CourseCard = ({ title, creator, date, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Text style={styles.icon}>📚</Text>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {title}
        </Text>
        <Text style={styles.subtitle}>Créateur : {creator}</Text>
        <Text style={styles.subtitle}>Dernière visite : {date}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default CourseCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginRight: 15,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  icon: {
    fontSize: 30,
    marginBottom: 10,
    color: '#4CAF50',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    width: 160,
    marginBottom: 8,
    color: '#343A40',
  },
  subtitle: {
    fontSize: 13,
    color: '#6C757D',
    textAlign: 'center',
  },
});
