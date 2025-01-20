import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const Quiz = ({ data }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(
    data.cartes[0].type === "qcm" && data.cartes[0].reponses.length >= 4 ? 2 : 1
  );
  const [errorMessage, setErrorMessage] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  
  const getToken = async () => {
    return await SecureStore.getItemAsync('userToken');
  };

  const UpdateMaitrise = async (IdCarte, Result) => {
    try {
      const userId = await getToken();
      const response = await fetch('https://sae501.mateovallee.fr/maitrise', {
        method: 'POST',
        body: JSON.stringify({
          id_user: userId,
          id_carte: IdCarte,
          reussie: Result,
        }),
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error('Erreur update maitrise : ', error);
    }
  };

  const currentCard = data.cartes[currentCardIndex];

  const handleSelectAnswer = (index) => {
    if (selectedAnswers.includes(index)) {
      setSelectedAnswers(selectedAnswers.filter((i) => i !== index));
    } else {
      setSelectedAnswers([...selectedAnswers, index]);
    }
  };

  const validateAnswers = async () => {
    if (currentCard.type === "qcm") {
      const correctAnswersIndexes = currentCard.reponses
        .map((item, index) => (item.correcte ? index : null))
        .filter((index) => index !== null);

      const isCorrect =
        correctAnswersIndexes.length === selectedAnswers.length &&
        correctAnswersIndexes.every((index) => selectedAnswers.includes(index));

      if (isCorrect) {
        await UpdateMaitrise(currentCard.id, true);
        setScore(score + 1);
        setCorrectAnswers((prev) => [
          ...prev,
          { question: currentCard.question, answers: currentCard.reponses.filter((r) => r.correcte) },
        ]);
        setErrorMessage(null);
        goToNextCard(); 
      } else {
        if (attemptsLeft > 1) {
          setAttemptsLeft(attemptsLeft - 1);
          setSelectedAnswers([]);
          setErrorMessage("Réponse incorrecte. Essayez à nouveau.");
        } else {
          await UpdateMaitrise(currentCard.id, false);
          setIncorrectAnswers((prev) => [
            ...prev,
            { question: currentCard.question, answers: currentCard.reponses.filter((r) => !r.correcte) },
          ]);
          setErrorMessage("Pas de tentatives restantes. Vous avez échoué cette question.");
          goToNextCard(); 
        }
      }
    }
  };

  const goToNextCard = () => {
    if (currentCardIndex + 1 < data.cartes.length) {
      setCurrentCardIndex(currentCardIndex + 1);
      setSelectedAnswers([]);
      setShowFlashcardAnswer(false);
      setErrorMessage(null);
      const nextCard = data.cartes[currentCardIndex + 1];
      setAttemptsLeft(nextCard.type === "qcm" && nextCard.reponses.length >= 4 ? 2 : 1); 
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
    setErrorMessage(null);
    setCorrectAnswers([]);
    setIncorrectAnswers([]); 
    setAttemptsLeft(
      data.cartes[0].type === "qcm" && data.cartes[0].reponses.length >= 4 ? 2 : 1
    );
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Quiz terminé ! Vous avez obtenu {score} / {data.cartes.filter((c) => c.type === "qcm").length}.
          </Text>
          <Text style={styles.correctAnswersText}>Réponses Correctes :</Text>
          <FlatList
            data={correctAnswers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.correctAnswerContainer}>
                <Text style={[styles.correctQuestion, { color: 'green' }]}>{item.question}</Text>
                {item.answers.map((answer, idx) => (
                  <Text key={idx} style={styles.correctAnswerText}>
                    - {answer.reponse}
                  </Text>
                ))}
              </View>
            )}
          />
          <Text style={styles.correctAnswersText}>Réponses Incorrectes :</Text>
          <FlatList
            data={incorrectAnswers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.correctAnswerContainer}>
                <Text style={[styles.correctQuestion, { color: 'red' }]}>{item.question}</Text>
                {item.answers.map((answer, idx) => (
                  <Text key={idx} style={styles.correctAnswerText}>
                    - {answer.reponse}
                  </Text>
                ))}
              </View>
            )}
          />
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Recommencer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        currentCard && (
          <View style={styles.cardContainer}>
            <Text style={styles.questionText}>
              {currentCard.question}
              {currentCard.type === "qcm" && currentCard.reponses.filter((r) => r.correcte).length > 1
                ? " (choix multiples)"
                : ""}
            </Text>

            {currentCard.type === "flashcard" ? (
              <View>
                {showFlashcardAnswer ? (
                  <Text style={styles.flashcardAnswer}>{Array.isArray(currentCard.reponses) ? currentCard.reponses[0].reponse : currentCard.reponses.reponse}</Text>
                ) : (
                  <Text style={styles.flashcardAnswer}>Cliquez pour révéler la réponse</Text>
                )}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowFlashcardAnswer(!showFlashcardAnswer)}
                >
                  <Text style={styles.buttonText}>
                    {showFlashcardAnswer ? "Masquer le verso" : "Révéler le verso"}
                  </Text>
                </TouchableOpacity>

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

            {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
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
  flashcardAnswer: { fontSize: 16, marginVertical: 16, color: "black" },
  scoreContainer: { alignItems: "center", justifyContent: "center", flex: 1 },
  scoreText: { fontSize: 24, fontWeight: "bold" },
  errorMessage: { color: "red", fontSize: 14, marginTop: 8 },
  correctAnswersText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
  },
  correctAnswerContainer: {
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  correctQuestion: {
    fontSize: 16,
    fontWeight: "bold",
  },
  correctAnswerText: {
    fontSize: 16,
    color: "#4CAF50",
  },
});

export default Quiz;
