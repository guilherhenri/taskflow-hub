import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'

import { api } from '@/services/api-client'

import { useAppSelector } from '..'

interface Task {
  id: number
  userId: number
  title: string
  completed: boolean
}

export interface TasksState {
  list: Array<Task>
  isLoading: boolean
}

const initialState: TasksState = {
  list: [],
  isLoading: false,
}

export const loadTasks = createAsyncThunk('load/tasks', async () => {
  const response = await api.get<Array<Task>>('todos').json()

  return response
})

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    toggle: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload
      const taskIndex = state.list.findIndex((task) => task.id === id)

      if (taskIndex >= 0) {
        state.list[taskIndex].completed = !state.list[taskIndex].completed
      }
    },
    add: (state, action: PayloadAction<{ title: string }>) => {
      const newTask: Task = {
        id: Math.floor(10 * Math.random() * 99),
        title: action.payload.title,
        completed: false,
        userId: Math.floor(10 * Math.random()),
      }

      state.list.push(newTask)
    },
    update: (state, action: PayloadAction<{ id: number; title: string }>) => {
      const { id, title } = action.payload
      const taskIndex = state.list.findIndex((task) => task.id === id)

      if (taskIndex >= 0) {
        state.list[taskIndex].title = title
      }
    },
    remove: (state, action: PayloadAction<{ id: number }>) => {
      const { id } = action.payload

      const newList = state.list.filter((task) => task.id !== id)

      state.list = newList
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.list = action.payload
    })
  },
})

export const tasks = tasksSlice.reducer
export const { toggle, add, update, remove } = tasksSlice.actions

export const useListTasks = () => {
  return useAppSelector((state) => state.tasks.list)
}
