import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';

const BtnHelp = ({title, text}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.helpButton} onPress={toggleModal}>
        <Text style={styles.buttonText}>Aide</Text>
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text>{title}</Text>
            <Text style={styles.modalText}>{text}</Text>
            <Button title="Fermer" onPress={toggleModal} />
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
    padding: 10,
    backgroundColor: 'blue',
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
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 18,
  },
});

export default BtnHelp;
