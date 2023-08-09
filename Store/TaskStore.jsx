import { create } from 'zustand'
import { v4 as uuidv4 } from 'uuid'
import { persist } from 'zustand/middleware'
import { format } from 'date-fns'
const itemsFromBackend = [
  {
    id: uuidv4(),
    content: 'One',
    title: 'First task',
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 10
  },
  {
    id: uuidv4(),
    content: 'Two',
    title: 'Second task',
    startDate: new Date(2022, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 20
  },
  {
    id: uuidv4(),
    content: 'Three',
    title: 'Third task',
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 30
  },
  {
    id: uuidv4(),
    content: 'Fourth',
    title: 'Fourth task',
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 40
  },
  {
    id: uuidv4(),
    content: 'Fifth',
    title: 'Fifth task',
    startDate: new Date(2023, 7, 8),
    endDate: new Date(2023, 9, 8),
    progress: 50
  }
]
const taskStore = (set, get) => {
  return {
    itemsFromBackend,
    columnsFromBackend: {
      columnBacklog: {
        name: 'Backlog',
        items: [...itemsFromBackend] // Sao chép mảng itemsFromBackend vào cột 'Backlog'
      },
      columnTodo: {
        name: 'To-Do',
        items: []
      },
      columnProgress: {
        name: 'In Progress',
        items: []
      },
      columnReview: {
        name: 'Review',
        items: []
      },
      columnDone: {
        name: 'Done',
        items: []
      }
    },

    // Hàm cập nhật itemsFromBackend
    setItemsFromBackend: (items) => set({ itemsFromBackend: items }),

    // Hàm cập nhật columnsFromBackend
    setColumnsFromBackend: (columns) => set({ columnsFromBackend: columns }),
    // Hàm thêm một mục mới vào mảng itemsFromBackend và cột cụ thể trong columnsFromBackend
    formatDate: (date) => {
      return format(date, 'dd/MM/yyyy'); // 'dd/MM/yyyy' là định dạng ngày/tháng/năm
    },

    formattedStartDate: (index) => {
      const item = get().itemsFromBackend[index];
      // console.log(item)
      // console.log(id)
      if (item && item.startDate) {
        return get().formatDate(item.startDate);
      }
      return '1'; // Hoặc giá trị mặc định nếu endDate không tồn tại
    },
    
    formattedEndDate: (index) => {
      const item = get().itemsFromBackend[index];
      if (item && item.endDate) {
        return get().formatDate(item.endDate);
      }
      return '2'; // Hoặc giá trị mặc định nếu endDate không tồn tại
    },
    
   
    addItemToColumn: (content) => {
      const newItem = {
        id: uuidv4(),
        title: content
      }
      set((state) => {
        // Tìm cột có name là 'Backlog'
        const backlogColumn = Object.values(state.columnsFromBackend).find((column) => column.name === 'Backlog')
        // Nếu không tìm thấy cột 'Backlog', không làm gì cả
        if (!backlogColumn) return state
        // Thêm newItem vào mảng items của cột 'Backlog'
        backlogColumn.items.push(newItem)
        // itemsFromBackend.push(newItem)

        console.log(state)
        return state
      })

      console.log(newItem)
      console.log(itemsFromBackend)
      console.log(get().columnsFromBackend)
    }
  }
}
export const useTaskStore = create(taskStore)
