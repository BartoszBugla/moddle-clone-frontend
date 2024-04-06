import {
  FormEvent,
  FormEventHandler,
  forwardRef,
  HTMLProps,
  PropsWithChildren,
} from 'react'
import {
  FieldValues,
  FormProvider,
  FormProviderProps,
  SubmitErrorHandler,
  SubmitHandler,
} from 'react-hook-form'

export type FormProps<T extends FieldValues = FieldValues> =
  FormProviderProps<T> & {
    onSubmit: SubmitHandler<T>
    onSubmitError?: SubmitErrorHandler<T>
    formProps?: Partial<HTMLProps<HTMLFormElement>>
    className?: string
    disableSubmitOnEnter?: boolean
  }

export const withoutPropagation =
  (
    callback: (event: FormEvent<HTMLFormElement>) => void
  ): FormEventHandler<HTMLFormElement> =>
  (event) => {
    event.stopPropagation()
    callback(event)
  }

const Form = forwardRef<HTMLFormElement, PropsWithChildren<FormProps<any>>>(
  (
    {
      onSubmit,
      disableSubmitOnEnter,
      onSubmitError,
      formProps,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <>
        <form
          ref={ref}
          noValidate
          role="form"
          {...formProps}
          onKeyDown={(e) => {
            if (disableSubmitOnEnter && e.key == 'Enter') e.preventDefault()
          }}
          onSubmit={withoutPropagation(
            props.handleSubmit(onSubmit, onSubmitError)
          )}
          className={className}
        >
          <FormProvider {...props} />
        </form>
      </>
    )
  }
)

export default Form
