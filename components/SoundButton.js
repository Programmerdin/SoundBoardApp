import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import { color_gradient, rgbToText } from "./ColorGradient";

export default function SoundButton(data) { 
  let button_color = data.button_color

  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(require("../assets/Hello.mp3"));
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);


  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {backgroundColor: button_color}]} onPressIn={playSound}>
        <Text>Play Sound</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 15,
  },
});
