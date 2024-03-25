import './ColorPicker.css';
import Slider from './Slider';
import React, { useState } from "react";

const MIN = 0;
const MAX = 255;

function ColorPicker() {
  const [targetColor, setTargetColor] = useState(generateRandomColor());
  const [userGuess, setUserGuess] = useState({ red: MIN, green: MIN, blue: MIN });
  const [resultMessage, setResultMessage] = useState("");

  const handleInputChange = (color, value) => {
    setUserGuess(prevState => ({ ...prevState, [color]: value }));
  };

  const handleGuess = () => {
    const guessText = `Your guess: rgb(${userGuess.red}, ${userGuess.green}, ${userGuess.blue})`;
    const actualText = `Actual: rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})`;
    setResultMessage(`${guessText}. ${actualText}`);
  };

  function generateRandomColor() {
    return {
      red: getRandomIntegerBetween(MIN, MAX),
      green: getRandomIntegerBetween(MIN, MAX),
      blue: getRandomIntegerBetween(MIN, MAX)
    };
  }

  function getRandomIntegerBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  return (
    <div className="ColorPicker">
      <h3>Guess the color of the rectangle</h3>
      {/* Display the target color */}
      <div id="color-preview" style={{ backgroundColor: `rgb(${targetColor.red}, ${targetColor.green}, ${targetColor.blue})` }} />

      {/* Display the sliders for the user's guess */}
      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{ backgroundColor: `rgb(${userGuess.red}, 0, 0)` }}>Red:</span>
          <Slider min={MIN} max={MAX} startingValue={userGuess.red} onChange={value => handleInputChange('red', value)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{ backgroundColor: `rgb(0, ${userGuess.green}, 0)` }}>Green:</span>
          <Slider min={MIN} max={MAX} startingValue={userGuess.green} onChange={value => handleInputChange('green', value)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{ backgroundColor: `rgb(0, 0, ${userGuess.blue})` }}>Blue:</span>
          <Slider min={MIN} max={MAX} startingValue={userGuess.blue} onChange={value => handleInputChange('blue', value)} />
        </div>
      </div>

      {/* Button to compare the user's guess with the target color */}
      <button onClick={handleGuess}>Guess</button>

      {/* Display the result message */}
      {resultMessage && <div id="result-message">{resultMessage}</div>}
    </div>
  );
}

export default ColorPicker;
