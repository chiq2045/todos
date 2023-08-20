export type Todo = {
  completed: boolean
  due: string
  subtitle?: string
  title: string
}

export type TodoWithId = Todo & {
  id: string
}
