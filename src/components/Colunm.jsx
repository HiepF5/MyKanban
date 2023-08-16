import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import { styled } from 'styled-components'
const TaskList = styled.div`
  padding: 4px;
  width: 250px;
  min-height: 600px;
  background-color: ${(props) => {
    switch (props.state) {
      case 'Backlog':
        return '#ffcc80'
      case 'To-Do':
        return '#81c784'
      case 'In Progress':
        return '#64b5f6'
      case 'Review':
        return '#00ffff'
      case 'Done':
        return '#a568df'
      default:
        return '#ccc'
    }
  }};
  border: 1px solid #ccc;
`
export default function Column({ id, tasks, name }) {
  return (
    <Droppable droppableId={id}>
      {(provided) => {
        return (
          <TaskList {...provided.droppableProps} ref={provided.innerRef} state={name}>
            {tasks.map((task, index) => {
              return <Task key={task.id} task={task} index={index} id={id}></Task>
            })}
            {provided.placeholder}
          </TaskList>
        )
      }}
    </Droppable>
  )
}
