import { useCallback, useState } from 'react'
import { Toast } from 'types'

export const useToasts = () => {
  const [toasts, setToasts] = useState<Array<Toast>>([])

  const addToast = useCallback(
    (toast: Toast) => {
      setToasts([...toasts, toast])
    },
    [toasts],
  )

  const removeToast = useCallback(
    (id: string) => {
      const toastId = toasts.findIndex((t) => t.id === id)
      if (toastId >= 0) {
        const newToasts = [...toasts]
        newToasts.splice(toastId, 1)
        setToasts(newToasts)
      }
    },
    [toasts],
  )

  return {
    toasts,
    addToast,
    removeToast,
  }
}
