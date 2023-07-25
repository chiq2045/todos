import { FormEventHandler, MouseEventHandler, useEffect, useState } from 'react'
import { Todo, TodoWithId } from 'types'
import { apiUrl } from './utils/constants'

export const App = () => {
  const [todos, setTodos] = useState(new Map<string, Todo>())
  const [loading, setLoading] = useState(false)
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const handleAddTodo: FormEventHandler = (e) => {
    if (!newTodoTitle) {
      console.error('Title cannot be blank')
      e.stopPropagation()
      return
    }

    e.preventDefault()

    setLoading(true)
    fetch(apiUrl, {
      method: 'post',
      body: JSON.stringify({ title: newTodoTitle }),
    })
      .then((res) => res.json())
      .then((data: { todo: TodoWithId }) => {
        setTodos((oldTodos) => {
          const newTodos = new Map(oldTodos)
          newTodos.set(data.todo.id, data.todo)
          return newTodos
        })
        setNewTodoTitle('')
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
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
  }, [])

  return (
    <main className="p-4">
      <section>
        <div className="content bg-white u-shadow-md u-round-md p-2 border-green-600 u-border-2 mb-0 u-flex u-flex-column u-gap-4">
          <form onSubmit={handleAddTodo}>
            <label>
              New Todo Title
              <input
                value={newTodoTitle}
                onChange={(e) => setNewTodoTitle(e.target.value)}
              />
            </label>
            <button className="btn-dark" type="submit">
              Add Todo
            </button>
          </form>
          <div className="u-flex u-flex-column u-gap-2">
            {[...todos].map(([id, todo]) => (
              <div
                className="tile u-items-center u-shadow-md p-2 border-green-400 u-border-1"
                key={id}
              >
                <div className="tile__container">
                  <p className="tile__title m-0">{todo.title}</p>
                </div>
                <div className="tile__buttons">
                  <button
                    className={`${
                      todo.completed
                        ? 'text-green-600 bg-green-100'
                        : 'btn-transparent'
                    } p-0`}
                    aria-label={`${
                      todo.completed ? 'Un-check' : 'Check'
                    } Complete`}
                  >
                    <span className="icon">
                      <i
                        className="fa fa-wrapper small fa-check"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  <button
                    className="btn-dark text-red-600 outline p-0"
                    aria-label="Delete"
                  >
                    <span className="icon">
                      <i
                        className="fa fa-wrapper small fa-times"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
