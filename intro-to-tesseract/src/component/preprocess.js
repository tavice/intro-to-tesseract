import React from 'react'

const preprocessImage = (canvas) => {
    const ctx=canvas.getContext('2d'); 
    const image=ctx.getImageData(0,0,canvas.width,canvas.height); // get the image data
    thresholdFilter(image.data, 0.5);
  return image
}

 // from https://github.com/processing/p5.js/blob/main/src/image/filters.js
 //explain`thresholdFilter` function: 
function thresholdFilter(pixels, level) { // level is the threshold value (0-1)     
    if (level === undefined) {
    level = 0.5;
    }
    const thresh = Math.floor(level * 255); // thresh is the threshold value (0-255)
    for (let i = 0; i < pixels.length; i += 4) { // i is the index of the red value of the pixel
    const red = pixels[i];
    const green = pixels[i + 1]; // green is the index of the green value of the pixel
    const blue = pixels[i + 2]; // blue is the index of the blue value of the pixel
    
    const gray = 0.2126 * red + 0.7152 * green + 0.0722 * blue; // calculate the gray value of the pixel
    let value;
    if (gray >= thresh) {
        value = 255;
    } else {
        value = 0;
    }
    pixels[i] = pixels[i + 1] = pixels[i + 2] = value; // set the red, green, and blue values to the same value
    }
  }

export default preprocessImage