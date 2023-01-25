function findDistancePercentage(x_coordinate, y_coordinate, end_x_coordinate, end_y_coordinate) {
  let distance = Math.pow(Math.pow(end_x_coordinate - x_coordinate, 2)+Math.pow(end_y_coordinate - y_coordinate, 2),0.5)
  let max_distance = Math.pow(Math.pow(end_x_coordinate, 2)+Math.pow(end_y_coordinate, 2),0.5)
  let fraction = (distance/max_distance)
  return fraction
}

//set max distance as 1 and measure all other cells distance and divide by max distance to get the percentage value
//and use that percentage by DesiredGradientRed = startRed+(percentage x (endRed-startRed))
//if it is left to right the max distance is number of cols
//if it is top to bottom the max distance is number of rows
//if it is diagonal the max distance is (number of cols^2 + number of rows^2)^(1/2)

//0: left to right
//1: top to bottom
//2: diagonal bottom left to top right
//3: diagonal top left to bottom right

export function colorGradientGenerator(number_of_cols, number_of_rows, startRGB, endRGB, direction_of_gradient) {
  let gradient = [];
  let max_distance = 0;
  if (direction_of_gradient == 0) {
    max_distance = number_of_cols;
    for (let i = 0; i < number_of_rows; i++) {
      let row = [];
      for (let j = 0; j < number_of_cols; j++) {
        let r = startRGB[0] + (endRGB[0] - startRGB[0]) * (j / (max_distance - 1));
        let g = startRGB[1] + (endRGB[1] - startRGB[1]) * (j / (max_distance - 1));
        let b = startRGB[2] + (endRGB[2] - startRGB[2]) * (j / (max_distance - 1));
        row.push([Math.round(r), Math.round(g), Math.round(b)]);
      }
      gradient.push(row);
    }
    return gradient;
  }

  if (direction_of_gradient == 1) {
    max_distance = number_of_rows;
    for (let i = 0; i < max_distance; i++) {
      let row = [];
      for (let j = 0; j < number_of_cols; j++) {
        let r = startRGB[0] + (endRGB[0] - startRGB[0]) * (i / (max_distance - 1));
        let g = startRGB[1] + (endRGB[1] - startRGB[1]) * (i / (max_distance - 1));
        let b = startRGB[2] + (endRGB[2] - startRGB[2]) * (i / (max_distance - 1));
        row.push([Math.round(r), Math.round(g), Math.round(b)]);
      }
      gradient.push(row);
    }
    return gradient;
  }

  if (direction_of_gradient == 2) {
    max_distance = Math.pow(Math.pow(number_of_cols, 2) + Math.pow(number_of_rows, 2), 0.5);

    for (let i = 0; i < number_of_rows; i++) {
      let row = [];
      for (let j = 0; j < number_of_cols; j++) {
        let r = startRGB[0]+(endRGB[0]-startRGB[0])*findDistancePercentage(j,i,number_of_cols,number_of_rows)
        let g = startRGB[1]+(endRGB[1]-startRGB[1])*findDistancePercentage(j,i,number_of_cols,number_of_rows)
        let b = startRGB[2]+(endRGB[2]-startRGB[2])*findDistancePercentage(j,i,number_of_cols,number_of_rows)
        row.push([Math.round(r), Math.round(g), Math.round(b)]);
      }
      gradient.push(row);
    }
    return gradient;
  }
}


let number_of_rows = 4, number_of_cols = 4;
let start_rgb_value = [255, 0, 212]
let end_rgb_value = [0, 221, 255]
export let color_gradient = colorGradientGenerator(number_of_cols, number_of_rows, start_rgb_value, end_rgb_value, 2)



export function rgbToText(r, g, b) {
  return "rgb(" + r + "," + g + "," + b + ")";
}