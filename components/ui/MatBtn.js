import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MatiereItem = ({ text, iconSource, onPress }) => (
    <TouchableOpacity style={styles.matiere} onPress={onPress}>
      <View style={styles.leftSection}>
        <Image source={iconSource} style={styles.icones} />
        <Text style={styles.matiereText}>{text}</Text>
      </View>
      <Image source={require('@/assets/images/BackArrow.png')} style={styles.arrow} />
    </TouchableOpacity>
  );

const styles = StyleSheet.create({
    matiere: {
        width: "100%",
        height: 96,
        borderRadius: 20,
        backgroundColor: "#F4F8FA",
        marginBottom: 15,
        display: "flex",
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        paddingHorizontal: 16, 
      },
      leftSection: {
        flexDirection: "row", 
        alignItems: "center",
      },
      matiereText: {
        marginLeft: 10, 
        fontSize: 18,
        fontWeight: "bold",
        color: '#333',
      },
      icones: {
        width: 54,
        height: 54
      },
      arrow : {
        width: 54,
        height: 54,
        transform: [{rotate: '180deg'}],
      }
});


export default MatiereItem;