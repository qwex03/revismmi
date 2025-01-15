import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import BackArrow from "@/components/ui/BackArrow";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { useLocalSearchParams } from 'expo-router';

const PolitiquePage = () => {
  const router = useRouter();
  const { first } = useLocalSearchParams();

  return(
        <View style={styles.container}>
            
            <View style={styles.header}>
              {first !== "true" && (
                <BackArrow color="white" route={"/profile"} />
              )}
              <Text style={styles.title}>Politique de confidentialité</Text>
            </View>
            
            <View style={styles.section}>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <Text style={styles.text}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                        consectetur nisi, eget varius lorem. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                        Phasellus facilisis dolor nec neque fermentum, ut ultricies arcu
                        commodo. Curabitur non luctus enim. Donec a ligula eu eros blandit
                        tincidunt. Fusce at ligula id arcu auctor eleifend. Vivamus sit amet
                        libero vel eros fringilla auctor non vitae nisl. Integer congue eros
                        vel dolor lacinia, a fringilla arcu placerat. Quisque elementum, purus
                        id fringilla fermentum, mauris odio rhoncus magna, ac pulvinar justo
                        sapien eget justo.
                        {"\n\n"}
                        Nullam et pharetra sapien. Donec tempor mi et purus fermentum posuere.
                        Ut ultricies arcu sit amet eros facilisis tincidunt. Praesent in
                        elementum leo, non pharetra lorem. Suspendisse potenti. Maecenas
                        feugiat, orci vel scelerisque venenatis, elit neque fringilla lacus,
                        vel aliquam mauris augue et est. Vestibulum vitae hendrerit erat.
                        Integer venenatis auctor venenatis. Nam in fringilla enim, id
                        vehicula velit. Curabitur feugiat risus eget sapien egestas lacinia.
                        {"\n\n"}
                        Duis dapibus eros ut dui venenatis porttitor. Suspendisse efficitur
                        scelerisque mi id consequat. Curabitur nec feugiat erat. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        curae; Etiam in est nec magna suscipit dapibus. Nam malesuada, magna
                        vel sodales varius, nisi nulla iaculis purus, a tincidunt eros augue
                        ut orci.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                        consectetur nisi, eget varius lorem. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                        Phasellus facilisis dolor nec neque fermentum, ut ultricies arcu
                        commodo. Curabitur non luctus enim. Donec a ligula eu eros blandit
                        tincidunt. Fusce at ligula id arcu auctor eleifend. Vivamus sit amet
                        libero vel eros fringilla auctor non vitae nisl. Integer congue eros
                        vel dolor lacinia, a fringilla arcu placerat. Quisque elementum, purus
                        id fringilla fermentum, mauris odio rhoncus magna, ac pulvinar justo
                        sapien eget justo.
                        {"\n\n"}
                        Nullam et pharetra sapien. Donec tempor mi et purus fermentum posuere.
                        Ut ultricies arcu sit amet eros facilisis tincidunt. Praesent in
                        elementum leo, non pharetra lorem. Suspendisse potenti. Maecenas
                        feugiat, orci vel scelerisque venenatis, elit neque fringilla lacus,
                        vel aliquam mauris augue et est. Vestibulum vitae hendrerit erat.
                        Integer venenatis auctor venenatis. Nam in fringilla enim, id
                        vehicula velit. Curabitur feugiat risus eget sapien egestas lacinia.
                        {"\n\n"}
                        Duis dapibus eros ut dui venenatis porttitor. Suspendisse efficitur
                        scelerisque mi id consequat. Curabitur nec feugiat erat. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        curae; Etiam in est nec magna suscipit dapibus. Nam malesuada, magna
                        vel sodales varius, nisi nulla iaculis purus, a tincidunt eros augue
                        ut orci.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                        consectetur nisi, eget varius lorem. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                        Phasellus facilisis dolor nec neque fermentum, ut ultricies arcu
                        commodo. Curabitur non luctus enim. Donec a ligula eu eros blandit
                        tincidunt. Fusce at ligula id arcu auctor eleifend. Vivamus sit amet
                        libero vel eros fringilla auctor non vitae nisl. Integer congue eros
                        vel dolor lacinia, a fringilla arcu placerat. Quisque elementum, purus
                        id fringilla fermentum, mauris odio rhoncus magna, ac pulvinar justo
                        sapien eget justo.
                        {"\n\n"}
                        Nullam et pharetra sapien. Donec tempor mi et purus fermentum posuere.
                        Ut ultricies arcu sit amet eros facilisis tincidunt. Praesent in
                        elementum leo, non pharetra lorem. Suspendisse potenti. Maecenas
                        feugiat, orci vel scelerisque venenatis, elit neque fringilla lacus,
                        vel aliquam mauris augue et est. Vestibulum vitae hendrerit erat.
                        Integer venenatis auctor venenatis. Nam in fringilla enim, id
                        vehicula velit. Curabitur feugiat risus eget sapien egestas lacinia.
                        {"\n\n"}
                        Duis dapibus eros ut dui venenatis porttitor. Suspendisse efficitur
                        scelerisque mi id consequat. Curabitur nec feugiat erat. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        curae; Etiam in est nec magna suscipit dapibus. Nam malesuada, magna
                        vel sodales varius, nisi nulla iaculis purus, a tincidunt eros augue
                        ut orci.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                        consectetur nisi, eget varius lorem. Pellentesque habitant morbi
                        tristique senectus et netus et malesuada fames ac turpis egestas.
                        Phasellus facilisis dolor nec neque fermentum, ut ultricies arcu
                        commodo. Curabitur non luctus enim. Donec a ligula eu eros blandit
                        tincidunt. Fusce at ligula id arcu auctor eleifend. Vivamus sit amet
                        libero vel eros fringilla auctor non vitae nisl. Integer congue eros
                        vel dolor lacinia, a fringilla arcu placerat. Quisque elementum, purus
                        id fringilla fermentum, mauris odio rhoncus magna, ac pulvinar justo
                        sapien eget justo.
                        {"\n\n"}
                        Nullam et pharetra sapien. Donec tempor mi et purus fermentum posuere.
                        Ut ultricies arcu sit amet eros facilisis tincidunt. Praesent in
                        elementum leo, non pharetra lorem. Suspendisse potenti. Maecenas
                        feugiat, orci vel scelerisque venenatis, elit neque fringilla lacus,
                        vel aliquam mauris augue et est. Vestibulum vitae hendrerit erat.
                        Integer venenatis auctor venenatis. Nam in fringilla enim, id
                        vehicula velit. Curabitur feugiat risus eget sapien egestas lacinia.
                        {"\n\n"}
                        Duis dapibus eros ut dui venenatis porttitor. Suspendisse efficitur
                        scelerisque mi id consequat. Curabitur nec feugiat erat. Vestibulum
                        ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                        curae; Etiam in est nec magna suscipit dapibus. Nam malesuada, magna
                        vel sodales varius, nisi nulla iaculis purus, a tincidunt eros augue
                        ut orci.
                    </Text>
                </ScrollView>
            </View>
            <TouchableOpacity onPress={() => {router.push("/home")}} style={styles.button}>
              <Text style={styles.buttonText}>J'accepte</Text>
            </TouchableOpacity>
        </View>
    )

    

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#0B93FD",
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      paddingTop: 45
    },
    header: {
      display: "flex",
      justifyContent: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "#FFFFFF",
      textAlign: "center",
      marginLeft: 10,
    },
    section: {
      width: "100%",
      flex: 1,
      backgroundColor: "#FFFFFF",
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
    },
    scrollContainer: {
      paddingVertical: 10,
    },
    text: {
      fontSize: 16,
      color: "#333333",
      lineHeight: 24,
    },
    button: {
      backgroundColor: "#62A4D5",
      width: "100%",
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 10,
    },
    buttonText: {
      color: "#FFFFFF",
      fontSize: 18,
      fontWeight: "bold",
    },
  });


export default PolitiquePage;