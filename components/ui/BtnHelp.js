import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, ScrollView, StyleSheet, Button } from 'react-native';

const BtnHelp = ({title, text, color = "#0B93FD"}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.helpButton, {backgroundColor: color}]} onPress={toggleModal}>
        <Text style={styles.buttonText}>Aide ?</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView style={styles.scroll}>
                <Text style={styles.modalText}>{text}</Text>
            </ScrollView>
            <Button style={styles.helpButton} title="Fermer" onPress={toggleModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  helpButton: {
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: 340,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    fontFamily: "bold",
    marginBottom: 10
  },
  modalText: {
    textAlign: "justify",
    marginBottom: 20,
    fontSize: 18,
  },
  scroll: {
    maxHeight: "400px",
    marginBottom: 25,
  }
});

export default BtnHelp;
