import { BarLoader } from 'react-spinners'
import { useTodos } from './utils/hooks/use-todos'
import { useEffect, useRef, useState } from 'react'
import { AddTodoForm } from './components/add-todo-form'
import { Dialog } from './components/dialog'

export const App = () => {
  const [deleteTodoId, setDeleteTodoId] = useState('')
  const { todos, loading, addTodo, getTodos, deleteTodo } = useTodos()
  const deleteTodoDialogRef = useRef<HTMLDialogElement>(null)

  const handleDeleteTodo = (id: string) => () => {
    deleteTodoDialogRef.current?.showModal()
    setDeleteTodoId(id)
  }

  useEffect(() => {
    getTodos()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="p-4">
      <section className="">
        <div className="content bg-white u-shadow-md u-round-md p-2 border-green-600 u-border-2 mb-0 u-flex u-flex-column u-gap-4">
          <AddTodoForm addTodo={addTodo} />
          {loading ? (
            <BarLoader
              role="status"
              aria-label="Loading"
              cssOverride={{ width: '100%' }}
            />
          ) : null}
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
                    onClick={handleDeleteTodo(id)}
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
      <Dialog
        ref={deleteTodoDialogRef}
        title="Delete Todo"
        onClose={() => deleteTodoDialogRef.current?.close()}
        body={
          <p>Do you want to delete {`"${todos.get(deleteTodoId)?.title}"`}</p>
        }
        footer={
          <div className="u-flex u-justify-space-between">
            <button
              onClick={() => {
                deleteTodoDialogRef.current?.close()
              }}
            >
              Cancel
            </button>
            <button
              className="btn-danger"
              type="submit"
              onClick={() => {
                deleteTodo(deleteTodoId)
                deleteTodoDialogRef.current?.close()
              }}
            >
              Confirm
            </button>
          </div>
        }
      />
    </main>
  )
}
