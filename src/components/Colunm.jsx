import React, { useState } from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Task from './Task'
import sort from '../assets/sort.svg'
import deleteAll from '../assets/delete.svg'
import { styled } from 'styled-components'
import { useTaskStore } from '../../Store/TaskStore'
const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4px;
  width: 250px;
  min-height: 600px;
  border-radius: 8px;
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
const TaskImg = styled.img`
  height: 30px;
  cursor: pointer;
  padding: 3px 6px;
  outline: none;
  border: none;
`
const TaskContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`
export default function Column({ id, tasks, name, keySearch }) {
  const sortTasksByContent = useTaskStore((state) => state.sortTasksByContent)
  const sortTasksDecrement = useTaskStore((state) => state.sortTasksDecrement)
  const deleteAllTasksInColumn = useTaskStore((state) => state.deleteAllTasksInColumn)
  const countTasksInColumn = useTaskStore((state) => state.countTasksInColumn)
  const [toggleSort, setToggleSort] = useState(false)
  const handSort = () => {
    if (toggleSort) {
      sortTasksDecrement(id);
    } else {
      sortTasksByContent(id);
    }

    setToggleSort(!toggleSort);
    console.log(toggleSort)
  };
  const handDeleteAll = ()=>{
    console.log('click')
    deleteAllTasksInColumn(id);
  }
  return (
    <>
      <Droppable droppableId={id}>
        {(provided) => {
          return (
            <>
              <TaskList {...provided.droppableProps} ref={provided.innerRef} state={name}>
                <TaskContainer>
                  <TaskImg src={sort} onClick={handSort} />
                  <TaskImg src={deleteAll} onClick={handDeleteAll} />
                </TaskContainer>
                {tasks.map((task, index) => {
                  if (task.title.toLowerCase().includes(keySearch.toLowerCase()))
                    return <Task key={task.id} task={task} index={index} id={id}></Task>
                })}
               <div>Number of tasks: {countTasksInColumn(id)}</div>
              </TaskList>
            </>
          )
        }}
      </Droppable>
    </>
  )
}
