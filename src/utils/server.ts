import { createServer, Factory, Model } from 'miragejs'
import { AnyResponse, ModelDefinition, Registry } from 'miragejs/-types'
import Schema from 'miragejs/orm/schema'
import { nanoid } from 'nanoid'
import { TodoWithId } from 'types'
import { apiUrl } from './constants'

const TodoModel: ModelDefinition<TodoWithId> = Model.extend({})
const models = {
  todo: TodoModel,
}

const todoFactory = Factory.extend<TodoWithId>({
  id() {
    return nanoid()
  },
  title(n) {
    return `Todo ${n}`
  },
  completed() {
    return false
  },
})
const factories = {
  todo: todoFactory,
}

type AppSchema = Schema<Registry<typeof models, typeof factories>>

export default function () {
  return createServer({
    models,
    factories,
    seeds(server) {
      server.createList('todo', 10)
    },
    routes() {
      this.get(apiUrl)
      this.delete(`${apiUrl}/:id`)
      this.post(apiUrl, (schema: AppSchema, request) => {
        const { title } = JSON.parse(request.requestBody)
        return schema.create('todo', { id: nanoid(), title, completed: false })
      })
      this.put(apiUrl, (schema: AppSchema, request) => {
        const { id } = request.params
        const updatedTodo = JSON.parse(request.requestBody)
        const oldTodo = schema.find('todo', id)
        if (oldTodo) {
          return oldTodo.update({
            ...updatedTodo,
          }) as unknown as AnyResponse
        }
        return null
      })
    },
  })
}
