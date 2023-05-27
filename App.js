import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "./screens/Welcome";
import Background from "./screens/Background";

export default function App() {
  const [image, setImage] = useState(null);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          options={{ title: 'Welcome' }}
          component={(props) => (
            <Welcome {...props} image={image} setImage={setImage} />
          )}
        />
        <Stack.Screen
          name="Edit"
          component={(props) => <Background {...props} image={image} />}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

