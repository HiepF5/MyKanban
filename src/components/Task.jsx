import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { styled } from 'styled-components'
import trash from '../assets/trash-2.svg'
import edit from '../assets/edit-btn.svg'
import { useTaskStore } from '../../Store/TaskStore'
import Progress from './Progress'
const TaskTitle = styled.div`
  color: white;
  user-select: none;
  padding: 16px;
  margin: 0 0 8px 0;
  min-height: 50px;
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
const TaskTitleItem =  styled.div`
  margin-bottom: 5px
`
export default function Task({item, index}) {
  const formattedStartDate= useTaskStore((state)=>state.formattedStartDate(index))
  const formattedEndDate= useTaskStore((state)=>state.formattedEndDate(index))
  const currentDate = new Date()
  // const [day, month, year] = [currentDate.getDate(), currentDate.getMonth() + 1, currentDate.getFullYear()]
  // const time = `Ngày: ${day}, Tháng: ${month}, Năm: ${year}`
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskTitle
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
              ...provided.draggableProps.style
            }}
          >
            <TaskTitleItem>{item.title}</TaskTitleItem>
            <TaskName>
              <div>
                <TaskImg src={trash} />
                <TaskImg src={edit} />
              </div>
              <div> {item.content}</div>
            </TaskName>
            <div>Ngày bắt đầu : {formattedStartDate}</div>
            <div>Ngày kết thúc : {formattedEndDate}</div>
            <div>Tiến độ xử lí: {item.progress}</div>
            {console.log(item)}
            <Progress item={item.progress}/>
          </TaskTitle>
        )
      }}
    </Draggable>
  )
}
