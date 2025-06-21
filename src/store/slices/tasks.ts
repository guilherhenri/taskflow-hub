import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { api } from '@/services/api-client'

import { useAppSelector } from '..'

interface Task {
  id: number
  userId: number
  title: string
  completed: boolean
}

interface TasksState {
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

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadTasks.fulfilled, (state, action) => {
      state.list = action.payload
    })
  },
})

export const tasks = tasksSlice.reducer

export const useListTasks = () => {
  return useAppSelector((state) => state.tasks.list)
}
