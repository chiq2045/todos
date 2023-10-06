import { useEffect } from 'react'
import { useToasts } from './utils/hooks/use-toasts'
import { useTodos } from './utils/hooks/use-todos'

export const App = () => {
  const { addToast } = useToasts()
  const { todos, getTodos } = useTodos(addToast)

  useEffect(() => {
    getTodos()
  }, [])

  return (
    <>
      <header>
        <h1>Todos</h1>
      </header>
      <main>
        <div>
          <div>
            <button type="button">Add Todo</button>
          </div>
          <div>Loader</div>
          <div>
            <ul>
              {[...todos].map(([id, todo]) => (
                <li key={id}>{todo.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  )
}
