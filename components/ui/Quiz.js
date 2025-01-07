import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Quiz = ({ data }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const currentCard = data.cartes[currentCardIndex];

  const handleSelectAnswer = (index) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((i) => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  const validateAnswers = () => {
    if (currentCard.type === "qcm") {  
      const correctAnswers = currentCard.reponses
        .map((item, index) => (item.correcte ? index : null))
        .filter((index) => index !== null);

      const isCorrect =
        correctAnswers.length === selectedAnswers.length &&
        correctAnswers.every((index) => selectedAnswers.includes(index));

      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex + 1 < data.cartes.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedAnswers([]); 
      setShowFlashcardAnswer(false);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentCardIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers([]);
    setShowFlashcardAnswer(false);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Quiz terminé ! Vous avez obtenu {score} / {data.cartes.length}.
          </Text>
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Recommencer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        currentCard && (
          <View style={styles.cardContainer}>
            <Text style={styles.questionText}>{currentCard.question}</Text>

            {currentCard.type === "flashcard" ? (
              <View>
                {showFlashcardAnswer ? (
                  <Text style={styles.flashcardAnswer}>
                    {currentCard.reponses.reponse}
                  </Text>
                ) : (
                  <Text style={styles.flashcardAnswer}>
                    Cliquez pour révéler la réponse
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                >
                  <Text style={styles.buttonText}>
                    {showFlashcardAnswer ? "Masquer le verso" : "Révéler le verso"}
                  </Text>
                </TouchableOpacity>

                {/* Afficher le bouton Suivant uniquement après avoir vu la réponse */}
                {showFlashcardAnswer && (
                  <TouchableOpacity style={styles.button} onPress={goToNextCard}>
                    <Text style={styles.buttonText}>Suivant</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              <FlatList
                data={currentCard.reponses}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      selectedAnswers.includes(index) && styles.selectedOptionButton,
                    ]}
                    onPress={() => handleSelectAnswer(index)}
                  >
                    <Text style={styles.optionText}>{item.reponse}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            {currentCard.type === "qcm" && (
              <TouchableOpacity style={styles.button} onPress={validateAnswers}>
                <Text style={styles.buttonText}>Valider</Text>
              </TouchableOpacity>
            )}

            {/* Afficher le bouton Suivant pour les QCM uniquement après validation des réponses */}
            {currentCard.type === "qcm" && selectedAnswers.length > 0 && (
              <TouchableOpacity style={styles.button} onPress={goToNextCard}>
                <Text style={styles.buttonText}>Suivant</Text>
              </TouchableOpacity>
            )}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  cardContainer: { marginVertical: 16 },
  questionText: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  optionButton: {
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  selectedOptionButton: { backgroundColor: "#d3f8d3" },
  optionText: { fontSize: 16 },
  button: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  flashcardAnswer: { fontSize: 16, marginVertical: 16 },
  scoreContainer: { alignItems: "center", justifyContent: "center", flex: 1 },
  scoreText: { fontSize: 24, fontWeight: "bold" },
});

export default Quiz;
