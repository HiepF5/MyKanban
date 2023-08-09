import React from 'react'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import DatePickerExample from './components/DatePickerExample'
import Date from './components/Date'
import DateTask from './components/DateTask'

function App() {
  return (
    <div>
      <h1>KanbanBoard</h1>
      <KanbanBoard/>
      {/* <DatePickerExample/> */}
      {/* <Date/> */}
      {/* <DateTask/> */}
    </div>
  )
}

export default App