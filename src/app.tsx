import { BarLoader } from 'react-spinners'
import { useTodos } from './utils/hooks/use-todos'
import { AddTodoForm } from './components/add-todo-forms'

export const App = () => {
  const { todos, loading, addTodo } = useTodos()

  return (
    <main className="p-4">
      <section className="">
        <div className="content bg-white u-shadow-md u-round-md p-2 border-green-600 u-border-2 mb-0 u-flex u-flex-column u-gap-4">
          <AddTodoForm addTodo={addTodo} />
          {loading ? <BarLoader role="status" aria-label="Loading" cssOverride={{ width: "100%" }} /> : null}
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
                    className={`${todo.completed
                      ? 'text-green-600 bg-green-100'
                      : 'btn-transparent'
                      } p-0`}
                    aria-label={`${todo.completed ? 'Un-check' : 'Check'
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
