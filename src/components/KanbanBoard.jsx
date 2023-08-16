import React from 'react'
import { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import Column from './Colunm'
import { v4 as uuidv4 } from 'uuid'
import { useTaskStore } from '../../Store/TaskStore'
import { styled } from 'styled-components'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './KanbanBoard.css' // Import tệp CSS vừa tạo
import { useEffect } from 'react'

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
  display: flex;
  flex-direction: column;
  background: white;
  position: absolute;
  z-index: 1;
  padding: 1rem;
  height: 10rem;
  width: 20rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`
const ModalDate = styled.div`
  position: relative !important;
`
function KanbanBoard() {
  const columns = useTaskStore((state) => state.columns)
  console.log(columns)
  const setColumns = useTaskStore((state) => state.setColumns)
  const indexStatus = {
    columnBacklog: 1,
    columnTodo: 2,
    columnProgress: 3,
    columnReview: 4,
    columnDone: 5
  }
  const onDragEnd = (result) => {
    if (!result.destination) return
    const { source, destination } = result
    console.log(result)
    console.log(source.droppableId)
    console.log(destination.droppableId)
    if (
      source.droppableId !== destination.droppableId &&
      indexStatus[source.droppableId] < indexStatus[destination.droppableId]
    ) {
      const sourceColumn = columns[source.droppableId]
      const destColumn = columns[destination.droppableId]
      const sourceTasks = [...sourceColumn.tasks]
      const destTasks = [...destColumn.tasks]
      const [removed] = sourceTasks.splice(source.index, 1)
      destTasks.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          tasks: sourceTasks
        },
        [destination.droppableId]: {
          ...destColumn,
          tasks: destTasks
        }
      })
    } else {
      const column = columns[source.droppableId]
      const copiedTasks = [...column.tasks]
      const [removed] = copiedTasks.splice(source.index, 1)
      copiedTasks.splice(destination.index, 0, removed)
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          tasks: copiedTasks
        }
      })
    }
    console.log(result)
  }
  const addTask = useTaskStore((state) => state.addTask)
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [dateRange, setDateRange] = useState([null, null])
  const [startDate, endDate] = dateRange
  const handleShow = () => {
    setShow(true)
  }
  const handleAddTask = () => {
    const newTask = {
      id: uuidv4(),
      title: title,
      content: content,
      isEditing: false,
      startDate: startDate,
      endDate: endDate,
      progress: -1
    }
    addTask('columnBacklog', newTask)
    setDateRange([null, null])
    setShow(false)
  }

  const handleChangeTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleChangContent = (event) => {
    setContent(event.target.value)
  }
  return (
    <Board>
      <ButtonAdd onClick={handleShow}>Add</ButtonAdd>
      {show && (
        <Modal>
          <ModalContent>
            <form>
              <input placeholder='Nhap Title' onChange={handleChangeTitle} />
              <input placeholder='Nhap Content' onChange={handleChangContent} />
              <ModalDate>
                <DatePicker
                  selectsRange={true}
                  startDate={startDate}
                  endDate={endDate}
                  placeholderText='Nhap Date'
                  onChange={(update) => {
                    setDateRange(update)
                  }}
                  withPortal
                />
              </ModalDate>

              <button onClick={handleAddTask}>Submit</button>
            </form>
          </ModalContent>
        </Modal>
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <Container key={id}>
              <h2>{column.name}</h2>
              <ListColumn>
                <Column key={id} id={id} tasks={column.tasks} name={column.name}></Column>
              </ListColumn>
            </Container>
          )
        })}
      </DragDropContext>
    </Board>
  )
}

export default KanbanBoard
