import { FormEventHandler, useState } from "react"
import { useTodos } from "src/utils/hooks/use-todos"

interface Props {
  addTodo: ReturnType<typeof useTodos>["addTodo"]
}
export const AddTodoForm = (props: Props) => {
  const [newTodoTitle, setNewTodoTitle] = useState('')

  const handleAddTodo: FormEventHandler = (e) => {
    if (!newTodoTitle) {
      console.error('Title cannot be blank')
      e.stopPropagation()
      return
    }

    e.preventDefault()

    props.addTodo({ title: newTodoTitle }).then(() => {
      setNewTodoTitle("")
    })
  }

  return (
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
  )
}
