import { add, remove, tasks, toggle, update } from './tasks'

const mockInitialState = {
  list: [
    { id: 1, userId: 1, title: 'Task 1', completed: false },
    { id: 2, userId: 1, title: 'Task 2', completed: true },
  ],
  isLoading: false,
}

describe('Tasks Slice', () => {
  it('should be able to add a task', () => {
    const newTaskTitle = 'Task 3'
    const state = tasks(mockInitialState, add({ title: newTaskTitle }))

    expect(state.list.length).toEqual(3)
    expect(state.list[2]).toMatchObject({
      title: newTaskTitle,
      completed: false,
    })
    expect(state.list[2].id).toBeDefined()
    expect(state.list[2].userId).toBeDefined()
  })

  it('should be able to toggle a task completion', () => {
    const taskId = 1
    const state = tasks(mockInitialState, toggle({ id: taskId }))

    expect(state.list[0].completed).toBe(true)
    expect(state.list[1].completed).toBe(true)
  })

  it('should be able to update a task title', () => {
    const taskId = 1
    const newTitle = 'Updated Task'
    const state = tasks(
      mockInitialState,
      update({ id: taskId, title: newTitle }),
    )

    expect(state.list[0].title).toBe(newTitle)
    expect(state.list[1].title).toBe('Task 2')
  })

  it('should be able to remove a task', () => {
    const taskId = 1
    const state = tasks(mockInitialState, remove({ id: taskId }))

    expect(state.list.length).toEqual(1)
    expect(state.list[0]).toMatchObject({ id: 2, title: 'Task 2' })
  })

  it('should not modify state when toggling invalid task id', () => {
    const state = tasks(mockInitialState, toggle({ id: 999 }))

    expect(state.list).toEqual(mockInitialState.list)
  })

  it('should not modify state when updating invalid task id', () => {
    const state = tasks(
      mockInitialState,
      update({ id: 999, title: 'Invalid Update' }),
    )

    expect(state.list).toEqual(mockInitialState.list)
  })

  it('should not modify state when removing invalid task id', () => {
    const state = tasks(mockInitialState, remove({ id: 999 }))

    expect(state.list).toEqual(mockInitialState.list)
  })
})
