import { useRef, useState } from "react"
import { useTodos } from "src/utils/hooks/use-todos"
import { Dialog } from "./dialog"

interface Props {
  addTodo: ReturnType<typeof useTodos>["addTodo"]
}
export const AddTodoForm = (props: Props) => {
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const ref = useRef<HTMLDialogElement>(null)

  if (ref.current) {
    ref.current.onclose = () => {
      setNewTodoTitle('')
    }
  }

  const closeDialog = () => ref.current?.close()

  const openDialog = () => ref.current?.showModal()

  const handleAddTodo = () => {
    if (!newTodoTitle) {
      console.error('Title cannot be blank')
      return
    }

    props.addTodo({ title: newTodoTitle }).then(() => {
      setNewTodoTitle("")
    }).finally(() => {
      closeDialog();
    })
  }

  return (
    <>
      <button className="btn-dark" onClick={openDialog}>Add Todo</button>
      <Dialog
        ref={ref}
        title="Add Todo"
        onClose={() => ref.current?.close()}
        body={
          <label>
            New Todo Title
            <input
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
            />
          </label>
        }
        footer={
          <div className="u-flex u-gap-1 u-justify-space-between">
            <button className="btn-light" onClick={closeDialog}>
              Cancel
            </button>
            <button className="btn-dark" onClick={handleAddTodo} disabled={newTodoTitle === ""}>
              Add Todo
            </button>
          </div>
        }
      />
    </>
  )
}
