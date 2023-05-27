import React, { useState, useRef } from "react";
import * as MediaLibrary from "expo-media-library";

import { captureRef } from "react-native-view-shot";

import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

export default function Background({ image }) {
  const [color, setColor] = useState("white");

  const imageRef = useRef();

  const [status, requestPermission] = MediaLibrary.usePermissions();

  if (status === null) {
    requestPermission();
  }

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved Successfully!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.btn}
        icon="content-save"
        mode="elevated"
        onPress={onSaveImageAsync}
      >
        Save
      </Button>

      <View style={styles.imgContainer}>
        <View ref={imageRef}>
          <View
            style={
              color === "white"
                ? styles.background
                : color === "#D3D3D3"
                ? styles.background2
                : color === "#5A5A5A"
                ? styles.background3
                : styles.background4
            }
          >
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        </View>
      </View>
      <View style={styles.btnGrp}>
        <TouchableOpacity
          onPress={() => {
            setColor("white");
          }}
          style={color === "white" ? styles.btnBorder : ""}
        >
          <View style={styles.colorBtn}></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setColor("#D3D3D3");
          }}
          style={color === "#D3D3D3" ? styles.btnBorder2 : ""}
        >
          <View style={styles.colorBtn2}></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setColor("#5A5A5A");
          }}
          style={color === "#5A5A5A" ? styles.btnBorder3 : ""}
        >
          <View style={styles.colorBtn3}></View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setColor("black");
          }}
          style={color === "black" ? styles.btnBorder4 : ""}
        >
          <View style={styles.colorBtn4}></View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9d9d9d",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#FFFDD0",
  },
  imgContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    backgroundColor: "white",
    height: windowWidth,
    width: windowWidth,
  },
  background2: {
    backgroundColor: "#D3D3D3",
    height: windowWidth,
    width: windowWidth,
  },
  background3: {
    backgroundColor: "#5A5A5A",
    height: windowWidth,
    width: windowWidth,
  },
  background4: {
    backgroundColor: "black",
    height: windowWidth,
    width: windowWidth,
  },
  image: {
    height: "100%",
    width: "100%",
    maxHeight: windowWidth,
    maxWidth: windowWidth,
    resizeMode: "contain",
  },
  btn: {
    alignSelf: "flex-end",
    margin: 15,
  },
  btnGrp: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ffe5b4",
    borderRadius: 25,
    marginBottom: 40,
  },
  colorBtn: {
    backgroundColor: "white",
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
  },
  btnBorder: {
    borderColor: "white",
    borderWidth: 3,
    borderRadius: 25,
  },
  colorBtn2: {
    backgroundColor: "#D3D3D3",
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
  },
  btnBorder2: {
    borderColor: "#D3D3D3",
    borderWidth: 3,
    borderRadius: 25,
  },
  colorBtn3: {
    backgroundColor: "#5A5A5A",
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
  },
  btnBorder3: {
    borderColor: "#5A5A5A",
    borderWidth: 3,
    borderRadius: 25,
  },
  colorBtn4: {
    backgroundColor: "black",
    width: 30,
    height: 30,
    borderRadius: 15,
    margin: 4,
  },
  btnBorder4: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 25,
  },
});
