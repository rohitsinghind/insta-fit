import React,{useState} from 'react'
import { StyleSheet, Text, View, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Button } from 'react-native-paper';

export default function Welcome({image, setImage, navigation}) {

  // const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      // aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      navigation.navigate('Background')
    }
  };

  return (
    <View style={styles.container}>
    <Button icon="camera-image" mode="elevated" onPress={pickImage}>
    Choose Image
  </Button>
  {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});