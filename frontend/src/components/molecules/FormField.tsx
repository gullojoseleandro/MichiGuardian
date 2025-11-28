import * as React from "react"
import { Label } from "@/components/atoms/Label"
import { Input } from "@/components/atoms/Input"
import { cn } from "@/lib/utils"

/**
 * Props for the FormField component.
 * Extends Input attributes and adds label and error props.
 */
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
    error?: string
}

/**
 * FormField molecule.
 * Combines a Label, an Input, and an optional error message.
 * Handles ID generation for accessibility if not provided.
 */
const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
    ({ className, label, error, id, ...props }, ref) => {
        const generatedId = React.useId()
        const inputId = id || generatedId

        return (
            <div className={cn("grid w-full max-w-sm items-center gap-1.5", className)}>
                <Label htmlFor={inputId}>{label}</Label>
                <Input ref={ref} id={inputId} {...props} />
                {error && <p className="text-sm font-medium text-destructive">{error}</p>}
            </div>
        )
    }
)
FormField.displayName = "FormField"

export { FormField }
