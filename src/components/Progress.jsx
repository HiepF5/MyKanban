import React, { useState } from 'react'
import './Progress.css'
import { useTaskStore } from '../../Store/TaskStore'

function Progress({ ColumnId, task }) {
  const [progress, setProgress] = useState(task.progress)
  const updateTaskProgress = useTaskStore((state) => state.updateTaskProgress)
  const [showSaveProgress, setShowSaveProgress] = useState(false)
  const handleProgressChange = (event) => {
    setProgress(parseInt(event.target.value, 10))
    setShowSaveProgress(true)
  }
  const handleSaveProgress = (ColumnId, task, progress) => {
    updateTaskProgress(ColumnId, task, progress)
    setShowSaveProgress(false)
  }
  const progressBarStyle = {
    width: `${progress}%`,
    background:
      progress > 40
        ? `linear-gradient(to right, green ${progress}%, gray ${progress}%)`
        : 'linear-gradient(to right, red 20%, yellow 20% 100%)'
  }

  return (
    <div className='App'>
      <input type='range' min='0' max='100' value={progress} onChange={handleProgressChange} />
      <div className='progress-bar'>
        <div className='progress' style={progressBarStyle}></div>
      </div>
      {showSaveProgress && <button onClick={() => handleSaveProgress(ColumnId, task, progress)}>Save</button>}
      <p>{progress}% Complete</p>
    </div>
  )
}

export default Progress
