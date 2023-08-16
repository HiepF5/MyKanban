import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { persist } from 'zustand/middleware'
const initTasks = [
  {
    id: uuidv4(),
    content: 'One',
    title: 'First task',
    isEditing: false,
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 10
  },
  {
    id: uuidv4(),
    content: 'Two',
    title: 'Second task',
    isEditing: false,
    startDate: new Date(2022, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 20
  },
  {
    id: uuidv4(),
    content: 'Three',
    title: 'Third task',
    isEditing: false,
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 30
  },
  {
    id: uuidv4(),
    content: 'Fourth',
    title: 'Fourth task',
    isEditing: false,
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 40
  },
  {
    id: uuidv4(),
    content: 'Fifth',
    title: 'Fifth task',
    isEditing: false,
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 50
  }
]
const taskStore = (set, get) => ({
  initTasks,
  columns: {
    columnBacklog: {
      name: 'Backlog',
      tasks: [...initTasks] // Sao chép mảng initTasks vào cột 'Backlog'
    },
    columnTodo: {
      name: 'To-Do',
      tasks: []
    },
    columnProgress: {
      name: 'In Progress',
      tasks: []
    },
    columnReview: {
      name: 'Review',
      tasks: []
    },
    columnDone: {
      name: 'Done',
      tasks: []
    }
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
    const updatedColumns = { ...get().columns };
    const taskIndex = updatedColumns[columnKey].tasks.findIndex((task) => task.id === taskId);
    
    if (taskIndex !== -1) {
      updatedColumns[columnKey].tasks[taskIndex] = {
        ...updatedColumns[columnKey].tasks[taskIndex],
        isEditing: !updatedColumns[columnKey].tasks[taskIndex].isEditing
      };
      set({ columns: updatedColumns });
    }
  },
})
export const useTaskStore = create(taskStore)
