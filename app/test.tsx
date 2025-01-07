import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import RenderHTML from "react-native-render-html";
import MarkdownIt from "markdown-it";
import markdownItKatex from "markdown-it-katex";
import BackArrow from "@/components/ui/BackArrow";
import Quiz from "@/components/ui/Quiz";


export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Entrainement");

  const testData = {
    "nom": "Cours de maths",
    "id_createur": 1,
    "id_categorie": 1,
    "resume": "Un cours de maths complet pour apprendre les bases et concepts avancés.",
    "cartes": [
      {
        "question": "Quelle est la capitale de la France ?",
        "reponses": [
          { "reponse": "Paris", "correcte": true },
          { "reponse": "Londres" },
          { "reponse": "Berlin" }
        ],
        "type": "QCM"
      },
      {
        "question": "Combien font 2 + 2 ?",
        "reponses": [
          { "reponse": "3" },
          { "reponse": "4", "correcte": true },
          { "reponse": "5" },
          { "reponse": "6" }
        ],
        "type": "QCM"
      },
      {
        "question": "Qu'est-ce que le théorème de Pythagore ?",
        "reponses": [
          { "reponse": "C'est une règle mathématique sur les triangles." }
        ],
        "type": "flashcard"
      }
    ]
  }
  
  const mdParser = new MarkdownIt().use(markdownItKatex);

  const markdown = `
# Cours de Mathématiques - Introduction à l'Algèbre
...
`;

  const htmlContent = mdParser.render(markdown);

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackArrow route={"/revise"} />
          <Text>Pythagore</Text>
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
          {activeTab === "Entrainement" && (
            <View style={styles.ResumeContainer}>
              <Quiz data={testData} />
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

