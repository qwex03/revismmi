import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';

const CourseCard = ({ title, creator }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>📚</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>Créateur : {creator}</Text>
    </View>
  );
};

export default CourseCard;


const styles = StyleSheet.create({
  card: {
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    height: 150,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: '#6C757D',
  },
});
