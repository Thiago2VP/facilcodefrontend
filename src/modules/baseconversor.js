const hexToDecimal = (hex) => parseInt(hex, 16);

const colorHexToDec = (colorHex) => {
  const R = hexToDecimal(`${colorHex[1]}${colorHex[2]}`);
  const G = hexToDecimal(`${colorHex[3]}${colorHex[4]}`);
  const B = hexToDecimal(`${colorHex[5]}${colorHex[6]}`);
  return `rgba(${R}, ${G}, ${B}, 0.5)`;
};

const colorRgbToHex = (colorRGB) => {
  let R = '';
  let G = '';
  let B = '';
  let i = 0;
  let colns = 0;
  let char = '';
  for (i; i < colorRGB.length; i += 1) {
    char = colorRGB[i];
    if (char === ',') {
      colns += 1;
    }
    if (i >= 5 && colns === 0 && char !== ',') {
      R += char;
    }
    if (colns === 1 && char !== ' ' && char !== ',') {
      G += char;
    }
    if (colns === 2 && char !== ' ' && char !== ',') {
      B += char;
    }
  }
  const numR = Number(R);
  const numG = Number(G);
  const numB = Number(B);
  let hexR = '';
  let hexG = '';
  let hexB = '';
  if (numR < 16) {
    hexR = `0${numR.toString(16)}`;
  } else {
    hexR = numR.toString(16);
  }
  if (numG < 16) {
    hexG = `0${numG.toString(16)}`;
  } else {
    hexG = numG.toString(16);
  }
  if (numB < 16) {
    hexB = `0${numB.toString(16)}`;
  } else {
    hexB = numB.toString(16);
  }
  const hexValue = `#${hexR}${hexG}${hexB}`;
  console.log(hexValue);
  return hexValue;
};

export { hexToDecimal, colorHexToDec, colorRgbToHex };
