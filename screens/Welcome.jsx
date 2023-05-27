import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";

export default function Welcome({ image, setImage, navigation }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      navigation.navigate("Edit");
    }
  };

  return (
    <ImageBackground source={require("../assets/background.jpg")} resizeMode="cover" style={styles.container}>
      <Button labelStyle={{ fontSize: 20 }} style={styles.btn} icon="camera-image" mode="elevated" onPress={pickImage}>
        Choose Image
      </Button>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn:{
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    height:50,

  }
});
