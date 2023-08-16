import React from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import { useTaskStore } from '../Store/TaskStore'
import { useEffect } from 'react'
function App() {
  const fetch = useTaskStore((state) => state.fetch)
  useEffect(() => {
    fetch('http://localhost:3000/columns')
  }, [])
  return (
    <div>
      <h1>KanbanBoard</h1>
      <KanbanBoard />
    </div>
  )
}

export default App
