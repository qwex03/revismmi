import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { StyleSheet } from 'react-native';

const CourseCard = ({ title, creator, date, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
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
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 150,    
  },
  subtitle: {
    fontSize: 12,
    color: '#6C757D',
  },
});
