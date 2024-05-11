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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export type FormSelectProps = Partial<ComponentProps<typeof Select>> & {
  name: string
  defaultValue?: string | number
  formatValue?: (value: string) => string | null
  description?: string | ReactNode
  descriptionProps?: ComponentProps<typeof FormDescription>
  label?: string | ReactNode
  labelProps?: ComponentProps<typeof FormLabel>
  hideError?: boolean
  options: { value: string; label: string }[]
  placeholder?: string
  className?: string
}

export const FormSelect = ({
  name,
  description,
  descriptionProps,
  formatValue,
  label,
  labelProps,
  disabled,
  defaultValue,
  hideError,
  className,
  options,
  placeholder,
  ...props
}: FormSelectProps) => {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      disabled={disabled}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel {...labelProps}>{label}</FormLabel>
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value)
              }}
              {...field}
              value={String(
                (formatValue ? formatValue(field.value) : field.value) ?? ''
              )}
              {...props}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map(({ value, label }) => {
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  )
                })}
              </SelectContent>
            </Select>
          </FormControl>
          <FormDescription {...descriptionProps}>{description}</FormDescription>
          {!hideError && <FormMessage />}
        </FormItem>
      )}
    />
  )
}
