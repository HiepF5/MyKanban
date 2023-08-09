import React, { useState } from 'react';
import './Progress.css';

function Progress({item}) {
   console.log(item)
  const [progress, setProgress] = useState(item); 
  // Giả sử ban đầu là 0%
  const handleProgressChange = (event) => {
    const newProgress = parseInt(event.target.value, 10);
    setProgress(newProgress);
  };

  const progressBarStyle = {
    width: `${progress}%`,
    background: `linear-gradient(to right, green ${progress}%, gray ${progress}% 100%)`,
  };

  return (
    <div className="App">
      <p>React Progress Bar</p>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
      />
      <div className="progress-bar">
        <div className="progress" style={progressBarStyle}></div>
      </div>
      <p>{progress}% Complete</p>
    </div>
  );
}

export default Progress;
