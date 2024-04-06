import { ComponentProps, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui'
import { Textarea } from '../ui/textarea'

export type FormTextareaProps = Partial<ComponentProps<typeof Textarea>> & {
  name: string
  defaultValue?: string | number
  formatValue?: (value: string) => string | null
  description?: string | ReactNode
  descriptionProps?: ComponentProps<typeof FormDescription>
  label?: string | ReactNode
  labelProps?: ComponentProps<typeof FormLabel>
  hideError?: boolean
}

export const FormTextarea = ({
  name,
  description,
  descriptionProps,
  formatValue,
  label,
  labelProps,
  disabled,
  defaultValue,
  hideError,
  ...props
}: FormTextareaProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel {...labelProps}>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              value={String(
                (formatValue ? formatValue(field.value) : field.value) ?? ''
              )}
              {...props}
            />
          </FormControl>
          <FormDescription {...descriptionProps}>{description}</FormDescription>
          {!hideError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
