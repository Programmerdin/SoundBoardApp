import { useEffect, useState } from "react"
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native"
import { Audio } from "expo-av"

export default function SoundButton(props) { 
  let button_color = props.button_color
  let y = props.y_coordinate
  let x = props.x_coordinate

  const [sound, setSound] = useState()

  async function playSound() {
    console.log("Loading Sound")
    const { sound } = await Audio.Sound.createAsync(require("../sounds/mixkit-cow-moo-1744.wav"))
    setSound(sound)

    console.log("Playing Sound")
    await sound.playAsync()
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound")
          sound.unloadAsync()
        }
      : undefined
  }, [sound])


  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.button, {backgroundColor: button_color}]} onPressIn={playSound}>
        <Text>{button_color}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    margin: 3,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 120,
    height: 120,
    borderRadius: 15,
  },
})
