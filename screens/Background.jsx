import React,{useRef} from 'react'

import {captureRef} from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

import { StyleSheet, Text, View, Image, PermissionsAndroid, Alert, Platform, } from 'react-native';
import { Button } from 'react-native-paper';

export default function Background({image}) {

     // create a ref
  const viewRef = useRef();

  // get permission on android
  const getPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Image Download Permission',
          message: 'Your permission is required to save images to your device',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      }
      Alert.alert(
        '',
        'Your permission is required to save images to your device',
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    } catch (err) {
      // handle error as you please
      console.log('err', err);
    }
  };

  // download image
  const downloadImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 1,
      });

      console.log("captured")

        const granted = await getPermissionAndroid();
        if (!granted) {
            console.log("permission denied")
          return;
        }

        console.log("captured 2")

      // cameraroll saves image
      const image = CameraRoll.save(uri, 'photo');
      if (image) {
        Alert.alert(
          '',
          'Image saved successfully.',
          [{text: 'OK', onPress: () => {}}],
          {cancelable: false},
        );
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
        <View ref={viewRef}>
            <Text>Helllloooo rohitttt</Text>
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
        </View>
        <Button icon="content-save" mode="elevated" onPress={downloadImage}>Save</Button>
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