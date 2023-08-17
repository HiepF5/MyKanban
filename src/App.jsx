import React, { useState } from 'react'
import './App.css'
import { styled } from 'styled-components'
import KanbanBoard from './components/KanbanBoard'
import { useTaskStore } from '../Store/TaskStore'
import { useEffect } from 'react'
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`
function App() {
  const fetch = useTaskStore((state) => state.fetch)
  const [keySearch, setKeySearch] = useState('')
  const [newColumn, setNewColumn] = useState('')
  useEffect(() => {
    fetch('http://localhost:3000/columns')
  }, [])
  return (
    <>
      <h1>KanbanBoard</h1>
      <InputContainer>
        <input placeholder='Tìm kiếm...' onChange={(e) => setKeySearch(e.target.value)} value={keySearch} />
      </InputContainer>
      <KanbanBoard keySearch={keySearch} />
    </>
  )
}

export default App
