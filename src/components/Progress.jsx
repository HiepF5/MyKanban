import React, { useState } from 'react';
import './Progress.css';

function Progress({progressTask}) {
  const [progress, setProgress] = useState(progressTask); 
  const handleProgressChange = (event) => {
    const newProgress = parseInt(event.target.value, 10);
    setProgress(newProgress);
  };

  const progressBarStyle = {
    width: `${progress}%`,
    background: progress > 40 ? `linear-gradient(to right, green ${progress}%, gray ${progress}%)` : 'linear-gradient(to right, red 20%, yellow 20% 100%)',
  };

  return (
    <div className="App">
      <p>Progress Bar</p>
      {/* <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleProgressChange}
      /> */}
      <div className="progress-bar">
        <div className="progress" style={progressBarStyle} ></div>
      </div>
      <p>{progress}% Complete</p>
    </div>
  );
}

export default Progress;
