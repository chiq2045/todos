import { HTMLAttributes, ReactNode, forwardRef } from 'react'

interface Props extends HTMLAttributes<HTMLDialogElement> {
  title: string
  onClose: () => void
  body?: ReactNode
  footer?: ReactNode
  header?: ReactNode
}
export const Dialog = forwardRef<HTMLDialogElement | null, Props>(
  function Dialog(props, ref) {
    const { children, ...dialogProps } = props
    return (
      <dialog {...dialogProps} ref={ref}>
        <div className="modal-content">
          <div className="modal-header pb-2">
            {props.header ?? (
              <div className="u-flex u-justify-space-between">
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
          </div>
          {children ?? (
            <>
              {props.body ? (
                <div className="modal-body py-2">{props.body}</div>
              ) : null}
              {props.footer ? (
                <div className="modal-footer pt-2">{props.footer}</div>
              ) : null}
            </>
          )}
        </div>
      </dialog>
    )
  },
)
