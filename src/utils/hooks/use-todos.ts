import { useState } from "react"
import { Todo, TodoWithId } from "types"
import { apiUrl } from "../constants"

export const useTodos = () => {
  const [todos, setTodos] = useState(new Map<string, Todo>())
  const [loading, setLoading] = useState(false)

  const getTodos = async () => {
    setLoading(true)
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data: { todos: TodoWithId[] }) => {
        console.log(data)
        const newTodos = new Map<string, Todo>()
        data.todos.forEach((todo) => {
          newTodos.set(todo.id, todo)
        })
        setTodos(newTodos)
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false)
      })
  }

  const addTodo = async (todo: Pick<Todo, "title" | "subtitle">) => {
    setLoading(true)
    return fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data: { todo: TodoWithId }) => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.set(data.todo.id, data.todo)
          return newTodos
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const updateTodo = async (id:string, todo: Todo) => {
    setLoading(true)
    return fetch(`${apiUrl}/${id}`, {
      method: 'put',
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data: { todo: TodoWithId }) => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.set(data.todo.id, data.todo)
          return newTodos
        })
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const deleteTodo = async (id:string) => {
    setLoading(true)
    return fetch(`${apiUrl}/${id}`, {
      method: 'delete',
    })
      .then((res) => res.json())
      .then(() => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.delete(id)
          return newTodos
        })
      })
      .catch((err) => {
        console.error(err)
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
