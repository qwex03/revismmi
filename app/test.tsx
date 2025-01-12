import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import RenderHTML from "react-native-render-html";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex";
import BackArrow from "@/components/ui/BackArrow";
import Quiz from "@/components/ui/Quiz";
import { useLocalSearchParams } from 'expo-router';
import * as SecureStore from 'expo-secure-store';


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
        const response = await fetch('https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/users'+userId+'/cours'+testId)
      } catch (error) {
        console.error('Error update data');
      }
    }

    upDateLastVisite()
  }, [])
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/cours/'+testId);
        const json = await response.json();
        setCour(json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lightgoldenrodyellow-chicken-532879.hostingersite.com/public/cours/'+testId);
        const json = await response.json();
        setCour(json);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  const mdParser = new MarkdownIt().use(markdownItKatex);
  const markdown = `
  # Cours de Mathématiques - Introduction à l'Algèbre
  ...
  `;

  if (loading) {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const htmlContent = cour && cour.resume ? mdParser.render(cour.resume) : mdParser.render("il n'y aucun cours");

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
                <RenderHTML source={{ html: htmlContent }} />
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