import { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import SoundButton from "./SoundButton";
import { colorGradientGenerator, rgbToText } from "./ColorGradient";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function Home() {
  let button_sides_length = 123; //dont forget to include margins 120+3
  let max_number_of_buttons_for_rows = 6;
  let max_number_of_buttons_for_cols = 5;
  let number_of_cols = Math.min(Math.floor((windowWidth-5) / button_sides_length), max_number_of_buttons_for_cols)
  let number_of_rows = Math.min(Math.floor((windowHeight-10) / button_sides_length), max_number_of_buttons_for_rows)
  let start_rgb_value = [255, 0, 212];
  let end_rgb_value = [0, 221, 255];

  const [color_gradient, Set_color_gradient] = useState([]);

  //initialize color_gradient
  useEffect(() => {
    let rgb_array = colorGradientGenerator(number_of_cols, number_of_rows, start_rgb_value, end_rgb_value, 2);
    let temp_color_gradient = [];
    for (let i = 0; i < rgb_array.length; i++) {
      let row = [];
      for (let j = 0; j < rgb_array[i].length; j++) {
        let text_rgb = rgbToText(rgb_array[i][j][0], rgb_array[i][j][1], rgb_array[i][j][2]);
        row.push(text_rgb);
      }
      temp_color_gradient.push(row);
    }
    Set_color_gradient(temp_color_gradient.slice()); //copying array
  }, []);

  return (
    <View style={styles.container}>
      <View>
        {[...Array(number_of_rows).keys()].map((index_y) => {
          return (
            <View style={styles.row}>
              {[...Array(number_of_cols).keys()].map((index_x) => {
                if (color_gradient.length <= 0) {
                  return [];
                } else {
                  return (
                    <SoundButton y_coordinate={index_y} x_coordinate={index_x} button_color={color_gradient[index_y][index_x]} />
                  );
                }
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
});
