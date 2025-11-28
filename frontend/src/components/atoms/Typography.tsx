import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * Typography variants configuration.
 * Defines styles for different text elements (h1, h2, p, etc.).
 */
const typographyVariants = cva("text-foreground", {
    variants: {
        variant: {
            h1: "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
            h2: "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
            h3: "scroll-m-20 text-2xl font-semibold tracking-tight",
            h4: "scroll-m-20 text-xl font-semibold tracking-tight",
            p: "leading-7 [&:not(:first-child)]:mt-6",
            blockquote: "mt-6 border-l-2 pl-6 italic",
            list: "my-6 ml-6 list-disc [&>li]:mt-2",
            lead: "text-xl text-muted-foreground",
            large: "text-lg font-semibold",
            small: "text-sm font-medium leading-none",
            muted: "text-sm text-muted-foreground",
        },
    },
    defaultVariants: {
        variant: "p",
    },
})

/**
 * Props for the Typography component.
 * Extends HTML attributes and variant props.
 * `as` prop allows changing the underlying HTML element.
 */
export interface TypographyProps
    extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
    as?: React.ElementType
}

/**
 * Typography component.
 * Renders text with consistent styling based on the `variant` prop.
 * Automatically selects the appropriate HTML tag if `as` is not provided.
 */
const Typography = React.forwardRef<HTMLElement, TypographyProps>(
    ({ className, variant, as, ...props }, ref) => {
        const Comp = as || (variant === "p" || variant === "lead" || variant === "large" || variant === "small" || variant === "muted" ? "p" : variant) || "p"

        return (
            // @ts-ignore - Dynamic component typing is tricky
            <Comp
                className={cn(typographyVariants({ variant, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Typography.displayName = "Typography"

export { Typography, typographyVariants }
