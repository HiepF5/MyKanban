import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { styled } from 'styled-components'
import trash from '../assets/trash-2.svg'
import edit from '../assets/edit-btn.svg'
import chevron from '../assets/chevron.svg'
import chevronTop from '../assets/chevron-top.svg'
import Progress from './Progress'
import DateTask from './DateTask'
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
const TaskTitleItem = styled.div`
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
export default function Task({ item, index }) {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <TaskTitle
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              backgroundColor: snapshot.isDragging ? '#4ba20e' : '#89db4e',
              height: show? 'auto': '20px',
              overflow: show ? 'auto': 'hidden',
              ...provided.draggableProps.style
            }}
          >
            <TaskTitleItem>{item.title}</TaskTitleItem>
            <ShowDetail onClick={toggleShow}>
              {show ? <TaskImg src={chevron} /> : <TaskImg src={chevronTop} />}
            </ShowDetail>
            <TaskName>
              <div>
                <TaskImg src={trash} />
                <TaskImg src={edit} />
              </div>
              <div> {item.content}</div>
            </TaskName>
            <DateTask startDateInput={item.startDate} endDateInput={item.endDate} />
            <div>Tiến độ xử lí: {item.progress}</div>
            <Progress item={item.progress} />
          </TaskTitle>
        )
      }}
    </Draggable>
  )
}
