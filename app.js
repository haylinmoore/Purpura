// jshint esversion: 6
// jscs:disable maximumLineLength
const getter = require('pixel-getter');

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? `0${hex}` : hex;
}

function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

let lastColor = [0, 0, 0];

getter.get(process.argv[2] || 'test.png', (err, pixels) => {
  let output = '';
  let size = Math.sqrt(pixels[0].length);

  let rowCounter = 0;

  output += `${size}z`;

  for (let i = 0; i < pixels[0].length; i += 1) {

    let pixel = [0, 0];

    if (pixels[0][i].a == 0) {
      pixel[0] = 0;
    } else {
      pixel[0] = 1;
    }

    if (pixel[0] == 0) {
      output += '1';
    }

    if (pixel[0] == 1) {
      if (lastColor[0] != pixels[0][i].r || lastColor[1] != pixels[0][i].g || lastColor[2] != pixels[0][i].b) {

        const color = '';

        output += '5';
        output += rgbToHex(pixels[0][i].r, pixels[0][i].g, pixels[0][i].b);
        lastColor = [pixels[0][i].r, pixels[0][i].g, pixels[0][i].b];

      }

      output += '2';
    }

    rowCounter += 1;

    if (rowCounter >= size) {
      output += '0';
      rowCounter = 0;
    }

  }

  console.log(output);

});
