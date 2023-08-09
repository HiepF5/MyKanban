import React from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import DatePickerExample from './components/DatePickerExample'
import DatePickerComponent from './components/DatePickerComponent'

function App() {
  return (
    <div>
      <h1>KanbanBoard</h1>
      <KanbanBoard/>
      <DatePickerExample/>
      <DatePickerComponent/>
    </div>
  )
}

export default App