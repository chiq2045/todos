import { HTMLAttributes, ReactNode, forwardRef, useRef } from 'react'

interface Props extends HTMLAttributes<HTMLDialogElement> {
  title: string
  onClose: () => void
  body?: ReactNode
  footer?: ReactNode
  header?: ReactNode
}
export const Dialog = forwardRef<HTMLDialogElement | null, Props>(
  function Dialog(props, ref) {
    const formRef = useRef<HTMLFormElement>(null)

    const { children, ...dialogProps } = props
    return (
      <dialog
        {...dialogProps}
        ref={ref}
        onSubmit={(e) => {
          props.onSubmit?.(e)
          formRef.current?.reset()
        }}
      >
        <div>
          {props.header ?? (
            <div>
              <h1>{props.title}</h1>
              <button
                className="btn-close"
                aria-label="Close"
                onClick={props.onClose}
              >
                Close
              </button>
            </div>
          )}
          {children ?? (
            <form method="dialog" ref={formRef}>
              {props.body ? <div>{props.body}</div> : null}
              {props.footer ? <div>{props.footer}</div> : null}
            </form>
          )}
        </div>
      </dialog>
    )
  },
)
