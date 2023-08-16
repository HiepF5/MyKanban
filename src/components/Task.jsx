import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { styled } from 'styled-components'
import trash from '../assets/trash-2.svg'
import edit from '../assets/edit-btn.svg'
import chevron from '../assets/chevron.svg'
import chevronTop from '../assets/chevron-top.svg'
import save from '../assets/save.svg'
import Progress from './Progress'
import DateTask from './DateTask'
import { useTaskStore } from '../../Store/TaskStore'
import './Task.css'
const TaskTitle = styled.div`
  position: relative;
  color: white;
  margin: 0 0 20px 0;
  margin-bottom: 20px;
  user-select: none;
  padding: 16px;
  background-color: rgb(155 208 139);
  // transition: width 2s, height 4s;
`
const TaskName = styled.div`
  background: white;
  border-radius: 4px;
  min-height: 5rem;
  color: black;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  cursor: move;
`
const TaskImg = styled.img`
  height: 1.25rem;
  cursor: pointer;
`
const TaskTitleTask = styled.div`
  margin-bottom: 12px;
`
const ShowDetail = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 3px 6px;
  outline: none;
  border: none;
  &:active,
  &:focus {
    outline: none;
  }
`
export default function Task({ task, index, id }) {
  const removeTask = useTaskStore((state) => state.removeTask)
  const toggleEdit = useTaskStore((state) => state.toggleEdit)
  const editTask = useTaskStore((state) => state.editTask)
  const [show, setShow] = useState(false)
  const [contentInput, setContentInput] = useState(task.content)
  const toggleShow = () => {
    setShow(!show)
  }
  const handleEdit = (ColumnId, TaskId) => {
    console.log('edit')
    toggleEdit(ColumnId, TaskId)
  }
  const saveEdit = (ColumnId, task) => {
    const newTask = {
      id: task.id,
      title: task.title,
      content: contentInput,
      isEditing: false,
      startDate: task.startDate,
      endDate: task.endDate,
      progress: task.progress
    }
    editTask(ColumnId, newTask)
  }
  const handChangContent = (e) => {
    setContentInput(e.target.value)
  }
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => {
        return (
          <>
            <TaskTitle
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={{
                backgroundColor: snapshot.isDragging ? '#4ba20e' : '#89db4e',
                height: show ? 'auto' : '20px',
                overflow: show ? 'auto' : 'hidden',
                ...provided.draggableProps.style
              }}
            >
              <TaskTitleTask>{task.title}</TaskTitleTask>
              <ShowDetail onClick={toggleShow}>
                {show ? <TaskImg src={chevron} /> : <TaskImg src={chevronTop} />}
              </ShowDetail>
              <TaskName>
                <div>
                  <TaskImg src={trash} onClick={() => removeTask(id, task.id)} />
                  <TaskImg src={edit} onClick={() => handleEdit(id, task.id)} />
                  {task.isEditing && <TaskImg src={save} onClick={() => saveEdit(id, task)} />}
                </div>
                <input
                  type='text'
                  value={contentInput}
                  onChange={(e) => handChangContent(e)}
                  readOnly={!task.isEditing}
                  className={!task.isEditing ? 'disabled' : ''}
                />
              </TaskName>
              <DateTask startDateInput={task.startDate} endDateInput={task.endDate} />
              <div>Tiến độ xử lí: {task.progress}</div>
              <Progress task={task.progress} />
            </TaskTitle>
          </>
        )
      }}
    </Draggable>
  )
}
