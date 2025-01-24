import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const MatiereItem = ({ text, iconSource, onPress }) => { 
  
  const renderIcon = () => {
    if (iconSource[0] == "0") {
      return <Text style={styles.icones}>{String.fromCodePoint(iconSource)}</Text>; 
    }
  };

  
  return (
  <TouchableOpacity style={styles.matiere} onPress={onPress}>
    <View style={styles.leftSection}>
      <Text style={styles.icones}>{renderIcon()}</Text>
      <Text 
        style={styles.matiereText} 
        numberOfLines={1} 
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </View>
    <Image source={require('@/assets/images/BackArrow.png')} style={styles.arrow} />
  </TouchableOpacity>
);
};

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
    maxWidth: "90%",
  },
  icones: {
    fontSize: 54,
  },
  arrow : {
    width: 54,
    height: 54,
    transform: [{rotate: '180deg'}],
  }
});

export default MatiereItem;
