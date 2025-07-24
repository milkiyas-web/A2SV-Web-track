import React from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from './ui/form'
import { Input } from './ui/input'
import { Control, Controller, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label: string;
    placeholder?: string;
    type?: "text" | "email" | "password";
}
type T = any
const FormField = ({ control, name, label, placeholder, type = "text" }: FormFieldProps<T>) => (

    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <FormItem>
                <FormLabel className='label text-gray-600'>{label}</FormLabel>
                <FormControl>
                    <div>
                        <Input className='input' placeholder={placeholder} type={type} {...field} />
                        {fieldState.error && (
                            <p className="text-sm text-red-500 mt-1">{fieldState.error.message?.toString()}</p>
                        )}
                    </div>

                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)


export default FormField