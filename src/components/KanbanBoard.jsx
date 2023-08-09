import React from 'react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Colunm'
import { useTaskStore } from '../../Store/TaskStore'
import { styled } from 'styled-components'
const Board = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const ListColumn = styled.div`
  margin: 8px;
`
const ButtonAdd = styled.div`
  width: fit-content;
  height: fit-content;
  background: #26357c;
  color: white;
  border-radius: 9px;
  padding: 1rem !important;
  margin: 0.5rem !important;
  cursor: pointer;
  font-size: large;
`
const Modal = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.3);
  z-index: 2;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
`
const ModalContent = styled.div`
  background: white;
  position: absolute;
  z-index: 1;
  padding: 1rem;
  height: 3rem;
  width: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`


function KanbanBoard() {
  const columns = useTaskStore((state) => state.columnsFromBackend)
  const setColumnsFromBackend = useTaskStore((state)=> state.setColumnsFromBackend)
  const indexStatus = {
    columnBacklog : 1,
    columnTodo: 2,
    columnProgress: 3,
    columnReview: 4,
    columnDone: 5
  }
  const onDragEnd = (result) => {
    if (!result.destination) return
    const { source, destination } = result
    console.log(indexStatus[source.droppableId])
    console.log(indexStatus[destination.droppableId])
    if (source.droppableId !== destination.droppableId && indexStatus[source.droppableId]< indexStatus[destination.droppableId] ) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceItems = [...sourceColumn.items]
      const destItems = [...destColumn.items]
      const [removed] = sourceItems.splice(source.index, 1)// [2, 1 ,3 ]
      destItems.splice(destination.index, 0, removed)
      setColumnsFromBackend({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems
        }
      })
    } else {
      const column = columns[source.droppableId]
      const copiedItems = [...column.items]
      // Remove the item from its original position
      const [removed] = copiedItems.splice(source.index, 1)
      copiedItems.splice(destination.index, 0, removed)
      setColumnsFromBackend({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems
        }
      })
    }
    console.log(result)
  }
  // console.log(APIColumns)
  // const [columns, setColumns] = useState(APIColumns)
  console.log(columns)
  console.log(columns)
  const addItemToColumn = useTaskStore((state) => state.addItemToColumn)
  const [show, setShow] = useState(false)
  const [text, setText] = useState('')
  const handleShow = () => {
    setShow(true)
  }
  const handleAddTask = () => {
    addItemToColumn(text)
    setShow(false)
  }
  const handleChangeText = (event) => {
    setText(event.target.value)
    console.log(text)
  }
  return (
    <Board>
      <ButtonAdd onClick={handleShow}>Add</ButtonAdd>
      {show && (
        <Modal>
          <ModalContent>
            <input placeholder='Nhap' onChange={handleChangeText} />
            <button onClick={handleAddTask}>Submit</button>
          </ModalContent>
        </Modal>
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Container key={id}>
              <h2>{column.name}</h2>
              <ListColumn>
                <Column key={id} id={id} items={column.items} name={column.name}></Column>
              </ListColumn>
            </Container>
          )
        })}
      </DragDropContext>
    </Board>
  )
}

export default KanbanBoard
