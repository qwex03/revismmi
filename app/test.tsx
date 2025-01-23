import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import RenderHTML from "react-native-render-html";
import BackArrow from "@/components/ui/BackArrow";
import Quiz from "@/components/ui/Quiz";
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Markdown from 'react-native-markdown-display';



export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Entrainement");
  const [cour, setCour] = useState(null);
  const [loading, setLoading] = useState(true);
  const { testId } = useLocalSearchParams();

  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  useEffect(() => {
    const upDateLastVisite = async () => {
      try {
        const userId = await getToken();
        const response = await fetch('https://sae501.mateovallee.fr/users/'+userId+'/cours/'+testId, {
          method: 'PUT'
        })
        const json = await response.json();
        console.log(json)
      } catch (error) {
        console.error('Error update data');
      }
    }

    upDateLastVisite()
  }, [])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://sae501.mateovallee.fr/cours/'+testId);
        const json = await response.json();
        setCour(json);
        setLoading(false);
        console.log(cour.resume)
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackArrow route={"/revise"} />
          <Text>{cour.nom}</Text>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.onglet, activeTab === "Entrainement" && styles.activeTab]}
            onPress={() => setActiveTab("Entrainement")}
          >
            <Text style={styles.textOnglet}>Entrainement</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.onglet, activeTab === "Résumé" && styles.activeTab]}
            onPress={() => setActiveTab("Résumé")}
          >
            <Text style={styles.textOnglet}>Résumé</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {activeTab === "Entrainement" && cour && (
            <View style={styles.ResumeContainer}>
              <Quiz data={cour} />
            </View>
          )}
          {activeTab === "Résumé" && (
            <View style={styles.ResumeContainer}>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Markdown>
                  {cour.resume}
                </Markdown>
              </ScrollView>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: "12%",
  },
  container: { 
    flex: 1, 
    alignItems: "center", 
    backgroundColor: "#F1FAEE" 
  },
  header: { 
    flexDirection: "row", 
    width: "80%", 
    justifyContent: "space-around", 
    alignItems: "center" 
  },
  onglet: { 
    backgroundColor: "#A8DADC", 
    padding: 15, 
    borderTopLeftRadius: 20, 
    borderTopRightRadius: 20, 
    width: "45%", 
    alignItems: "center" 
  },
  activeTab: { 
    backgroundColor: "#457B9D" 
  },
  textOnglet: { 
    color: "white", 
    fontWeight: "bold" 
  },
  content: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    width: "100%", 
    backgroundColor: "#457B9D" 
  },
  contentText: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#333", 
    marginBottom: 20 
  },
  ResumeContainer: { 
    backgroundColor: "white", 
    width: "80%", 
    padding: 20, 
    borderRadius: 20, 
    flex: 1 
  },
  scrollContainer: { 
    paddingBottom: 20 
  },
});