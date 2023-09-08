import React, { useState } from 'react'
import './InformationTask.css'
import trash from '../assets/trash-2.svg'
import edit from '../assets/edit-btn.svg'
import save from '../assets/save.svg'
import exit from '../assets/exit.svg'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useTaskStore } from '../../Store/TaskStore'
import './Task.css'
function InformationTask({ task, setShowInformation, id }) {
  const [value, setValue] = React.useState(dayjs('2022-04-17'))
  const removeTask = useTaskStore((state) => state.removeTask)
  const toggleEdit = useTaskStore((state) => state.toggleEdit)
  const editTask = useTaskStore((state) => state.editTask)
  const [formData, setFormData] = useState({
    id: task.id,
    content: task.content,
    title: task.title,
    isEditing: task.isEditing,
    describe: task.describe,
    startDate: task.startDate,
    endDate: task.endDate,
    process: task.process
  })
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleEdit = (ColumnId, TaskId) => {
    toggleEdit(ColumnId, TaskId)
  }
  const saveEdit = (ColumnId, formData) => {
    const newTask = {
      id: formData.id,
      title: formData.title,
      content: formData.content,
      isEditing: false,
      startDate: formData.startDate,
      endDate: formData.endDate,
      progress: formData.progress
    }

    editTask(ColumnId, newTask)
  }
  return (
    <div className='container'>
      <div className='container_info border'>
        <h3>Information Task</h3>
        <div className='container_title border m-16 p-16'>
          Title Task :{' '}
          <input
            placeholder='title'
            name='title'
            readOnly={!task.isEditing}
            className={!task.isEditing ? 'disabled' : ''}
            value={formData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className='container_content border m-16 p-16'>
          Content Task :
          <input
            placeholder='title'
            name='content'
            readOnly={!task.isEditing}
            className={!task.isEditing ? 'disabled' : ''}
            value={formData.content}
            onChange={handleInputChange}
          />
        </div>
        <div className='container_describe border m-16 p-16'>
          Describe :
          <input
            placeholder='title'
            readOnly={!task.isEditing}
            className={!task.isEditing ? 'disabled' : ''}
            name='describe'
            value={formData.describe}
            onChange={handleInputChange}
          />{' '}
        </div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker label='Controlled picker' value={value} onChange={(newValue) => setValue(newValue)} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className='container_action border'>
        <h3>Chức năng</h3>
        <img src={exit} className='img_action btn_action border' onClick={() => setShowInformation(false)} />
        <img className='img_action btn_action border' src={trash} onClick={() => removeTask(id, formData.id)} />
        <img className='img_action btn_action border' src={edit} onClick={() => handleEdit(id, formData.id)} />
        {task.isEditing && (
          <img src={save} className='img_action btn_action border' onClick={() => saveEdit(id, formData)} />
        )}
      </div>
    </div>
  )
}

export default InformationTask
