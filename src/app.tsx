import { useEffect, useRef, useState } from 'react'
import { useToasts } from './utils/hooks/use-toasts'
import { useTodos } from './utils/hooks/use-todos'
import { Dialog } from './components/dialog'
import { format } from 'date-fns'

export const App = () => {
  const { addToast } = useToasts()
  const { todos, addTodo, getTodos, updateTodo, deleteTodo } =
    useTodos(addToast)
  const addTodoDialogRef = useRef<HTMLDialogElement>(null)
  const deleteTodoDialogRef = useRef<HTMLDialogElement>(null)
  const editTodoDialogRef = useRef<HTMLDialogElement>(null)
  const [selectedTodoId, setSelectedTodoId] = useState('')

  useEffect(() => {
    getTodos()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <header>
        <h1>Todos</h1>
      </header>
      <main>
        <div>
          <div>
            <button
              type="button"
              onClick={() => addTodoDialogRef.current?.showModal()}
            >
              Add Todo
            </button>
          </div>
          <div>Loader</div>
          <div>
            <ul>
              {[...todos].map(([id, todo]) => (
                <li key={id}>
                  <details>
                    <summary>
                      <div>
                        <p>{todo.title}</p>
                        <div>
                          {todo.completed ? (
                            <span className="fa fa-check" />
                          ) : null}
                          <p>
                            <span className="fa fa-calendar" />
                            <span>{new Date(todo.due).toDateString()}</span>
                          </p>
                        </div>
                      </div>
                    </summary>
                    <div>
                      {todo.notes ? <p>{todo.notes}</p> : null}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTodoId(id)
                          editTodoDialogRef.current?.showModal()
                        }}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTodoId(id)
                          deleteTodoDialogRef.current?.showModal()
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Dialog
        title="Edit Todo"
        ref={editTodoDialogRef}
        onClose={() => editTodoDialogRef.current?.close()}
        onSubmit={(e) => {
          const data = new FormData(e.target as HTMLFormElement)
          const title = data.get('title') as string
          const notes = data.get('notes') as string
          const completed = Boolean(data.get('completed'))
          const due = data.get('due') as string
          updateTodo(selectedTodoId, { title, notes, completed, due })
          setSelectedTodoId('')
        }}
        body={
          todos.get(selectedTodoId) ? (
            <div>
              <label htmlFor="add-todo-title">
                Title
                <input
                  id="add-todo-title"
                  name="title"
                  defaultValue={todos.get(selectedTodoId)!.title}
                />
              </label>
              <label htmlFor="add-todo-completed">
                Completed
                <input
                  id="add-todo-completed"
                  type="checkbox"
                  name="completed"
                  defaultChecked={todos.get(selectedTodoId)!.completed}
                />
              </label>
              <label htmlFor="add-todo-due">
                Due
                <input
                  id="add-todo-due"
                  type="date"
                  name="due"
                  defaultValue={format(
                    new Date(todos.get(selectedTodoId)!.due),
                    'yyyy-MM-dd',
                  )}
                />
              </label>
              <label htmlFor="add-todo-content">
                Notes
                <textarea
                  id="add-todo-notes"
                  name="notes"
                  defaultValue={todos.get(selectedTodoId)!.notes}
                />
              </label>
            </div>
          ) : (
            <h2>Todo does not exist</h2>
          )
        }
        footer={
          <div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                editTodoDialogRef.current?.close()
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => editTodoDialogRef.current?.close()}
            >
              Submit
            </button>
          </div>
        }
      />
      <Dialog
        title="Delete Todo"
        ref={deleteTodoDialogRef}
        onClose={() => deleteTodoDialogRef.current?.close()}
        onSubmit={() => {
          deleteTodo(selectedTodoId)
          setSelectedTodoId('')
        }}
        body={<p>Delete {todos.get(selectedTodoId)?.title ?? 'todo'}?</p>}
        footer={
          <div>
            <button
              type="button"
              onClick={() => deleteTodoDialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => deleteTodoDialogRef.current?.close()}
            >
              Delete
            </button>
          </div>
        }
      />
      <Dialog
        title="Add Todo"
        ref={addTodoDialogRef}
        onClose={() => addTodoDialogRef.current?.close()}
        onSubmit={(e) => {
          const data = new FormData(e.target as HTMLFormElement)
          const title = data.get('title') as string
          const notes = data.get('notes') as string
          addTodo({ title, notes })
        }}
        body={
          <div>
            <label htmlFor="add-todo-title">
              Title
              <input id="add-todo-title" name="title" />
            </label>
            <label htmlFor="add-todo-content">
              Notes
              <textarea id="add-todo-notes" name="notes" />
            </label>
          </div>
        }
        footer={
          <div>
            <button
              type="button"
              onClick={() => addTodoDialogRef.current?.close()}
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={() => addTodoDialogRef.current?.close()}
            >
              Submit
            </button>
          </div>
        }
      />
    </>
  )
}
