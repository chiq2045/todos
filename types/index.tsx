export type Todo = {
  title: string
  completed: boolean
}

export type TodoWithId = Todo & {
  id: string
}
