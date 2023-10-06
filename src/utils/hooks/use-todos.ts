import { useState } from 'react'
import { Todo, TodoWithId } from 'types'
import { apiUrl, devMode } from '../constants'
import { useToasts } from './use-toasts'
import { useLocalStorage } from 'usehooks-ts'
import { nanoid } from 'nanoid'

export const useTodos = (
  addToast: ReturnType<typeof useToasts>['addToast'],
) => {
  const [todos, setTodos] = useState(new Map<string, Todo>())
  const [loading, setLoading] = useState(false)
  const [localTodos, setLocalTodos] = useLocalStorage(
    'todos',
    [] as [string, Todo][],
  )

  console.log({ todos, localTodos })
  const getTodos = async () => {
    setLoading(true)
    if (devMode) {
      return new Promise(() => {
        const newTodos = new Map(localTodos)
        setTodos(newTodos)
      }).finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 500)
      })
    }
    return fetch(apiUrl)
      .then((res) => res.json())
      .then((res: { data: TodoWithId[]; message: string }) => {
        const newTodos = new Map<string, Todo>()
        res.data.forEach((todo) => {
          newTodos.set(todo.id, todo)
        })
        setTodos(newTodos)
      })
      .catch((err) => {
        addToast({ id: nanoid(), title: 'Error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const addTodo = async (todo: Pick<Todo, 'title' | 'subtitle'>) => {
    setLoading(true)
    if (devMode) {
      return new Promise(() => {
        const newTodos = new Map(localTodos)
        newTodos.set(nanoid(), {
          ...todo,
          completed: false,
          due: new Date().toISOString(),
        })
        setLocalTodos([...newTodos])
        setTodos(newTodos)
      })
        .then(() => {
          addToast({ id: nanoid(), title: 'Success', message: 'Added todo' })
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        })
    }
    return fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res: { data: Todo; id: string; message: string }) => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.set(res.id, res.data)
          return newTodos
        })
        addToast({ id: nanoid(), title: 'Success', message: res.message })
      })
      .catch((err) => {
        addToast({ id: nanoid(), title: 'Error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateTodo = async (id: string, todo: Todo) => {
    setLoading(true)
    if (devMode) {
      return new Promise(() => {
        const newTodos = new Map(localTodos)
        newTodos.set(id, todo)
        setLocalTodos([...newTodos])
        setTodos(newTodos)
      })
        .then(() => {
          addToast({ id: nanoid(), title: 'Success', message: 'Updated todo' })
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        })
    }
    return fetch(`${apiUrl}/${id}`, {
      method: 'put',
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((res: { data: Todo; id: string; message: string }) => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.set(res.id, res.data)
          return newTodos
        })
        addToast({ id: nanoid(), title: 'Success', message: res.message })
      })
      .catch((err) => {
        addToast({ id: nanoid(), title: 'Error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const deleteTodo = async (id: string) => {
    setLoading(true)
    if (devMode) {
      return new Promise(() => {
        const newLocalTodos = new Map(localTodos)
        newLocalTodos.delete(id)
        setLocalTodos([...newLocalTodos])
        setTodos(newLocalTodos)
      })
        .then(() => {
          addToast({ id: nanoid(), title: 'Success', message: 'Deleted todo' })
        })
        .finally(() => {
          setTimeout(() => {
            setLoading(false)
          }, 500)
        })
    }
    return fetch(`${apiUrl}/${id}`, {
      method: 'delete',
    })
      .then((res) => res.json())
      .then((res: { message: string }) => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.delete(id)
          return newTodos
        })
        addToast({ id: nanoid(), title: 'Success', message: res.message })
      })
      .catch((err) => {
        addToast({ id: nanoid(), title: 'Error', message: err.message })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return {
    todos,
    loading,
    addTodo,
    updateTodo,
    deleteTodo,
    getTodos,
  }
}
