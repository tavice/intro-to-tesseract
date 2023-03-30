import { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import preprocessImage from "./preprocess";

function ImageToTextConverter() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [confidence, setConfidence] = useState("");
  const canvasRef = useRef(null);
  const imageRef = useRef(null);

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
    console.log((event.target.files[0]))
  };



  const handleClick = () => { 
    const canvas = canvasRef.current; 
    const ctx = canvas.getContext("2d");

    console.log(imageRef.current.complete);

    // Make sure image is loaded before using it
    if (imageRef.current.complete) {
      ctx.drawImage(imageRef.current, 0, 0);
      ctx.putImageData(preprocessImage(canvas), 0, 0);

      Tesseract.recognize(canvasRef.current, "eng", {
        logger: (m) => console.log(m),
      })
        .catch((err) => {
          console.error(err);
        })
        .then((result) => {
          let confidence = result.data.confidence;
            console.log(confidence);
            setConfidence(confidence);
          let text = result.data.text;
          setText(text);
        });
    } else {
      console.log("Image is not loaded yet!");
    }
  };

  return (
    <div className="App">
      <main className="App-main">
        <h3 className="imagePath">Actual imagePath uploaded</h3>
        <img
          src={imagePath}
          className="App-image"
          alt="logo"
          ref={imageRef}
          onLoad={() => console.log("Image loaded!")}
        />

        <h3 className="canvas">Canvas</h3>
        <canvas ref={canvasRef} width={500} height={500}></canvas>
        <h3>Extracted text</h3>
        <div className="pin-box">
          <p> {text} </p>
        </div>
        <div className="button-box">
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{ height: 50 }}>
          {" "}
          convert to text
        </button>
        </div>
        <h3 className="confidence">Confidence</h3>
        <div className="pin-box">
            <p> {confidence} %</p>
        </div>
      </main>
    </div>
  );
}

export default ImageToTextConverter;
