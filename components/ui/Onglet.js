import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Onglet = () => {

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.onglet}>
                    <Text>Entrainement</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.onglet}>
                    <Text>Résumé</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Onglet;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CFDFEC', 
    },
    header: {
        flexDirection: 'row', 
        width: '80%', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 16, 
        paddingVertical: 8,
        marginBottom: 20,
        backgroundColor: "red",
    }
})

