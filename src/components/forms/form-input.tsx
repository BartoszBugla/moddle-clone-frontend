import { ComponentProps, ReactNode } from 'react'
import { useFormContext } from 'react-hook-form'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '../ui'

export type FormInputProps = Partial<ComponentProps<typeof Input>> & {
  name: string
  defaultValue?: string | number
  formatValue?: (value: string) => string | null
  description?: string | ReactNode
  descriptionProps?: ComponentProps<typeof FormDescription>
  label?: string | ReactNode
  labelProps?: ComponentProps<typeof FormLabel>
  hideError?: boolean
}

export const FormInput = ({
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
}: FormInputProps) => {
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
            <Input
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
