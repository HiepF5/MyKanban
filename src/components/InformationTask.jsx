import React from 'react'
import './InformationTask.css'
import trash from '../assets/trash-2.svg'
import edit from '../assets/edit-btn.svg'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
function InformationTask({ task, setShowInformation }) {
  const [value, setValue] = React.useState(dayjs('2022-04-17'))

  return (
    <div className='container'>
      <div className='container_info border'>
        <h3>Information Task</h3>
        <div className='container_title border m-16 p-16'>Title Task : {task.title}</div>
        <div className='container_content border m-16 p-16'>Content Task :{task.content}</div>
        <div className='container_describe border m-16 p-16'>Describe</div>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker label='Controlled picker' value={value} onChange={(newValue) => setValue(newValue)} />
          </DemoContainer>
        </LocalizationProvider>
      </div>
      <div className='container_action border'>
        <div>Chức năng</div>
        <button className='btn_save' onClick={() => setShowInformation(false)}>
          Save
        </button>
        <img className='img_action' src={trash} onClick={() => removeTask(id, task.id)} />
        <img className='img_action' src={edit} onClick={() => handleEdit(id, task.id)} />
      </div>
    </div>
  )
}

export default InformationTask
