import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

const Quiz = ({ data }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [attemptCount, setAttemptCount] = useState(0);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showFlashcardAnswer, setShowFlashcardAnswer] = useState(false);

  const currentCard = currentQuestionIndex < data.cartes.length 
    ? data.cartes[currentQuestionIndex] 
    : null;

  const toggleAnswer = (selectedIndex) => {
    if (selectedAnswers.includes(selectedIndex)) {
      setSelectedAnswers(selectedAnswers.filter((index) => index !== selectedIndex));
    } else {
      setSelectedAnswers([...selectedAnswers, selectedIndex]);
    }
  };

  const validateAnswers = () => {
    if (!currentCard || currentCard.type === "flashcard") return;

    const isCorrect =
      selectedAnswers.length === currentCard.bonnesReponses.length &&
      selectedAnswers.every((index) => currentCard.bonnesReponses.includes(index));

    if (isCorrect) {
      setScore(score + 1);
      setShowErrorMessage(false);
      setSelectedAnswers([]);
      setAttemptCount(0);

      if (currentQuestionIndex + 1 < data.cartes.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowScore(true);
      }
    } else if (currentCard.reponses.length >= 4) {
      setAttemptCount(attemptCount + 1);

      if (attemptCount + 1 >= 2) {
        setShowErrorMessage(false);
        setSelectedAnswers([]);
        setAttemptCount(0);

        if (currentQuestionIndex + 1 < data.cartes.length) {
          setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
          setShowScore(true);
        }
      } else {
        setShowErrorMessage(true);
      }
    } else {
      // Move to the next card for questions with less than 4 answers after a single attempt
      setShowErrorMessage(false);
      setSelectedAnswers([]);
      setAttemptCount(0);
      if (currentQuestionIndex + 1 < data.cartes.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setShowScore(true);
      }
    }
  };

  const nextCard = () => {
    setShowFlashcardAnswer(false);
    setSelectedAnswers([]);
    setAttemptCount(0);

    if (currentQuestionIndex + 1 < data.cartes.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswers([]);
    setAttemptCount(0);
    setShowErrorMessage(false);
    setShowFlashcardAnswer(false);
  };

  return (
    <View style={styles.container}>
      {showScore ? (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>
            Quiz terminé ! Vous avez obtenu {score} / {data.cartes.filter(card => card.type === "qcm").length}.
          </Text>
          <TouchableOpacity style={styles.button} onPress={resetQuiz}>
            <Text style={styles.buttonText}>Recommencer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        currentCard && (
          <View style={styles.quizContainer}>
            <Text style={styles.questionText}>
              {currentCard.type === "flashcard"
                ? `Flashcard ${currentQuestionIndex + 1}/${data.cartes.length}`
                : `Question ${currentQuestionIndex + 1}/${data.cartes.length}`}
            </Text>
            <Text style={styles.questionText}>{currentCard.question}</Text>

            {currentCard.type === "flashcard" ? (
              <View>
                {showFlashcardAnswer ? (
                  <Text style={styles.flashcardAnswer}>{currentCard.reponses[0].reponse}</Text>
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
                <TouchableOpacity
                  style={styles.button}
                  onPress={nextCard}
                >
                  <Text style={styles.buttonText}>Suivant</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                {showErrorMessage && (
                  <Text style={styles.errorMessage}>Mauvaises réponses, réessayez</Text>
                )}
                <FlatList
                  data={currentCard.reponses}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      style={[
                        styles.optionButton,
                        selectedAnswers.includes(index) && styles.selectedOptionButton,
                      ]}
                      onPress={() => toggleAnswer(index)}
                    >
                      <Text style={styles.optionText}>{item.reponse}</Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity style={styles.button} onPress={validateAnswers}>
                  <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  quizContainer: {
    width: '100%',
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  flashcardAnswer: {
    fontSize: 18,
    fontStyle: 'italic',
    marginVertical: 20,
    textAlign: 'center',
  },
  optionButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedOptionButton: {
    backgroundColor: '#0056b3',
  },
  optionText: {
    color: '#ffffff',
    fontSize: 16,
  },
  scoreContainer: {
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default Quiz;
