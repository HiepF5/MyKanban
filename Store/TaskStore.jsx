import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { persist } from 'zustand/middleware'
import axios from 'axios'

const taskStore = (set, get) => ({
  columns: {},
  fetch: async (url) => {
    const response = await axios.get(url)
    set({ columns: response.data })
  },

  // Hàm cập nhật columns
  setColumns: (columns) => set({ columns: columns }),
  // Chức năng thêm task
  addTask: (columnKey, task) => {
    const updatedColumns = { ...get().columns }
    updatedColumns[columnKey].tasks.push(task)
    set({ columns: updatedColumns })
  },

  // Chức năng xoá task
  removeTask: (columnKey, taskId) => {
    const updatedColumns = { ...get().columns }
    updatedColumns[columnKey].tasks = updatedColumns[columnKey].tasks.filter((task) => task.id !== taskId)
    set({ columns: updatedColumns })
  },

  // Chức năng chỉnh sửa task
  editTask: (columnKey, updatedTask) => {
    const updatedColumns = { ...get().columns }
    const taskIndex = updatedColumns[columnKey].tasks.findIndex((task) => task.id === updatedTask.id)
    if (taskIndex !== -1) {
      updatedColumns[columnKey].tasks[taskIndex] = updatedTask
      set({ columns: updatedColumns })
    }
  },
  toggleEdit: (columnKey, taskId) => {
    const updatedColumns = { ...get().columns }
    const taskIndex = updatedColumns[columnKey].tasks.findIndex((task) => task.id === taskId)

    if (taskIndex !== -1) {
      updatedColumns[columnKey].tasks[taskIndex] = {
        ...updatedColumns[columnKey].tasks[taskIndex],
        isEditing: !updatedColumns[columnKey].tasks[taskIndex].isEditing
      }
      set({ columns: updatedColumns })
    }
  },
  //Sort
  sortTasksByContent: (columnKey) => {
    const updatedColumns = { ...get().columns }
    const tasks = updatedColumns[columnKey].tasks

    tasks.sort((task1, task2) => {
      const title1 = task1.title.toLowerCase()
      const title2 = task2.title.toLowerCase()
      return title1.localeCompare(title2)
    })

    set({ columns: updatedColumns })
  },
  sortTasksDecrement: (columnKey) => {
    const updatedColumns = { ...get().columns }
    const tasks = updatedColumns[columnKey].tasks

    tasks.sort((task1, task2) => {
      const title1 = task1.title.toLowerCase()
      const title2 = task2.title.toLowerCase()
      return title2.localeCompare(title1)
    })

    set({ columns: updatedColumns })
  },
  // Thêm column mới vào store
  createColumn: (title) => {
    const idColumn = 'column' + title
    const newColumn = {
      name: title,
      tasks: []
    }
    set({
      columns: {
        [idColumn]: {
          ...newColumn
        }
      }
    })
  }
})
export const useTaskStore = create(taskStore)
