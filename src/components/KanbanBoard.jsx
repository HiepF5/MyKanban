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
  position: absolute;
  background: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
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
const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return
  const { source, destination } = result
  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId]
    const destColumn = columns[destination.droppableId]
    const sourceItems = [...sourceColumn.items]
    const destItems = [...destColumn.items]
    const [removed] = sourceItems.splice(source.index, 1)
    destItems.splice(destination.index, 0, removed)
    setColumns({
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
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    })
  }
}

function KanbanBoard() {
  const APIColumns = useTaskStore((state) => state.columnsFromBackend)
  // console.log(APIColumns)
  const [columns, setColumns] = useState(APIColumns)
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
      <DragDropContext onDragEnd={(result) => onDragEnd(result, columns, setColumns)}>
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
