export type Todo = {
  completed: boolean
  due: string
  subtitle?: string
  title: string
}

export type TodoWithId = Todo & {
  id: string
}

export type Toast = {
  id: string;
  timeout?: number;
  title: string;
  type?: ToastType;
  message: string;
};

export type ToastType =
  | 'success'
  | 'warning'
  | 'danger'
  | 'error'
  | 'info'
  | 'link'
  | 'primary'
  | 'gray'
  | 'dark';
